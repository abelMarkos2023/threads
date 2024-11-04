"use server"

import {revalidatePath} from 'next/cache';
import {connectToDB} from "@/lib/db/connectDB";
import User from '@/lib/db/models/user.model';
import Thread from '@/lib/db/models/thread.model';
import { FilterQuery, SortOrder } from 'mongoose';

interface IUpdateUserArgs {
    user: {
        id: string,
        name: string,
        username: string,
        profile_photo: string,
        bio: string,
       
    }
    path: string;
}

export const fetchUser = async(userId:string) => {
    connectToDB();

    try {
        const user = await User.findOne({id: userId});
        return user;
    } catch (error: any) {
        throw new Error(error.message)
        
    }
}
export const fetchUserById = async(userId:string) => {
    connectToDB();

    try {
        const user = await User.findById(userId).populate({path:'threads',model:Thread,populate: [
            {
                path: 'author',
                model: User
            },
            {
                path: 'children',
                model: Thread,
                populate: {
                    path: 'author',
                    model: User
                }
            }
        ]});
        return user;
    } catch (error: any) {
        throw new Error(error.message)
        
    }
}
export const updateUser = async(user:IUpdateUserArgs['user'],path:IUpdateUserArgs['path']) : Promise<void> => {

   await connectToDB();
    const {name,username,bio,profile_photo,id} = user;

    try{
        
   await  User.findOneAndUpdate({id},{name,username,image: profile_photo,bio,onboarded: true},{upsert: true})

   if(path = '/profile/edit'){
    revalidatePath(path)
   }
    } catch(error: any){
        console.log('couldn\'t update user',error.message)
    }
}

export const fetchUserThreads = async (userId: string) => {
    connectToDB();

    try{
        const userThreads = await User.findById(userId).populate({
            path: 'threads',
            model: Thread,
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: '_id  name image '
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: '_id  name image'
                    }
                }
            ]
        });

        return userThreads
    }catch(error: any){
        throw new Error('Failed fetching user Threads ' + error.message)
    }
}

type searchUserFunctionArgumentType = {
    userId:string,
    searchString:string,
    pageNumber:number,
    pageSize:number,
    sortBy: SortOrder
}
export async function searchUsers({userId,searchString,pageNumber=1,pageSize=20,sortBy='desc'}:searchUserFunctionArgumentType){

    try {
        connectToDB();

        const skipAmount: number = (pageNumber - 1) * pageSize;

        const searchTerm = new RegExp(searchString,'i');

        const query : FilterQuery<typeof User> = {id:{$ne: userId}}

        if(searchString.trim() !== ''){
            query.$or = [
                {name:{$regex: searchTerm}},
                {username:{$regex: searchTerm}}
            ]
        }

        const sortOption = {createdAt:sortBy}

        const searchQuery = User.find(query)
                                        .sort(sortOption)
                                        .skip(skipAmount)
                                        .limit(pageSize)
        const totalUsers = await User.countDocuments(query);
        const queryResult = await searchQuery.exec();
        const isNext = totalUsers > queryResult.length + skipAmount ;

        return {
            totalUsers,
            queryResult,
            isNext
        }
    } catch (error: any) {
        console.log(error.message)
    }

}

export async function getActivities(userId: string){

    
    try{
        connectToDB();
        const userThreads = await Thread.find({author:userId});

        const userChildrenThreadsIds = userThreads.map(thread => thread.children).reduce((acc,threadId) => acc.concat(threadId),[])

        const activities = await Thread.find({
            author:{$ne:userId},
            _id: {$in:userChildrenThreadsIds}
        }).populate({
            path: 'author',
            model: User,
            select: '_id id image name'
        });

        return activities;

    }catch(error: any){
        console.log(`Error fetching activities : ${error.message}`)
    }
    
}