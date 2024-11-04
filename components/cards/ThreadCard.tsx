import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface IProps{
    text: string;
    id: string;
    author: {
        _id: string,
        id: string,
        name: string,
        image: string,
    };
    createdAt: string;
    parentId: string | null;
    comments: {
            _id: string,
            name: string,
            image: string,
    }[],
    community: {
        name: string,
        image: string,
        id: string
    } | null,
    isComment?:boolean
}

const ThreadCard = ({text,author,createdAt,parentId,id,comments,isComment}:IProps) => {
  return (
    <article className = {`flex flex-col p-8 rounded-xl ${isComment ? 'bg-dark-1' : ' bg-dark-3'}`}>
        <div className="flex items-center justify-between">
          <div className="flex flex-row flex-1 gap-2">
            <div className="flex flex-col items-center">
              <Link href={`/profile/${author.id}`} className = 'h-12 w-12 relative'>
              <Image 
              className = 'h-11 w-11 rounded-full cursor-pointer'
              src= {author.image}
              alt={author.name}
              fill
              />
              </Link>
              <div className="thread-card_bar"></div>
            </div>
            <div className = 'w-full flex flex-col'>
            <Link href={`/profile/${author.id}`} className = 'w-fit'>
            <h4 className="text-base-semibold text-light-1">{author.name}</h4>
            </Link>
            <p className="text-light-2 text-small-regular mt-1">{text}</p>
            <div className="flex flex-col mt-4">
              <div className="flex gap-4">
                <Image src= "/assets/heart-gray.svg" alt= 'heart' width = {24} height = {24} className='cursor-pointer object-contain'/>
                <Link href = {`/reply/${id}`}>
                <Image src= "/assets/reply.svg" alt= 'reply' width = {24} height = {24} className='cursor-pointer object-contain'/>
                </Link>
             
              <Image src= "/assets/repost.svg" alt= 'repost' width = {24} height = {24} className='cursor-pointer object-contain'/>
              <Image src= "/assets/share.svg" alt= 'share' width = {24} height = {24} className='cursor-pointer object-contain'/>
              </div>
              {isComment && comments.length > 0  && (
                <p className="text-subtle-semibold mt-1 text-gray-1">{comments.length} replies</p>
              )}
            </div>
            </div>
          </div>
        </div>
    </article>
  )
}

export default ThreadCard