"use server"

import { revalidatePath } from 'next/cache';
import Thread from '../db/models/thread.model';
import User from '../db/models/user.model';
import { connectToDB } from './../db/connectDB';

interface ICreateThreadParams {
    text: string;
    author: string;
    community: string | null;
    path: string
}
export const createThread = async({text,author,community,path}: ICreateThreadParams) => {

    connectToDB();

    const createdThread = await Thread.create({
        text,
        author,
        community: null
    });

    await User.findByIdAndUpdate(author,{
        $push: {threads: createdThread._id}
    });
    revalidatePath(path)
}

export const fetchThreads = async(pageSize: number = 30,pageNumber:number = 1) => {

    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const fetchQuery = Thread.find({parentId: {$in: [null, undefined]}})
    .sort({createdAt: 'desc'})
    .skip(skipAmount)
    .limit(pageSize)
    .populate('author')
    .populate({path: 'children',populate: {
        path: 'author',
        model: User,
        select: '_id name image'

    }});
    const totalThreadsCount = await Thread.countDocuments({parentId: {$in: [null, undefined]}});
    
    const threads = await fetchQuery.exec();

    const isNext = totalThreadsCount > threads.length + skipAmount ;

    return {
        threads,isNext
    }
}

export const fetchThreadById = async(id:string) => {

    try {
        const thread = await Thread.findById(id)
        .populate({path: 'author',model: User})
        .populate({path: 'children',
            populate: [
            {
                path: 'author',
                model: User
            },
            {
                path: 'children',
                model: Thread,
                populate: {
                    path: 'author',
                    model: User,
                    select: '_id name image'
                }
            }
        ]}).exec();

        return thread;
    } catch (error: any) {
        console.log(error.message)
        
    }
} 

export async function addCommentToThread({threadId,userId,content,path}:{threadId:string,userId:string,content:string,path: string}){

    try{
        const originalThread = await Thread.findById(threadId);
        const commentThread = await Thread.create({
            text: content,
            author: userId,
            parentId: originalThread._id
        });
        originalThread.children.unshift(commentThread._id);
        await originalThread.save();

        revalidatePath(path);
    }
    catch(error){
        throw new Error(error.message)
    }
}