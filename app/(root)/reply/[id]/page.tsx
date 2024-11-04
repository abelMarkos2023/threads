import ThreadCard from '@/components/cards/ThreadCard'
import Comment from '@/components/forms/Comment';
import { fetchThreadById } from '@/lib/actions/thread.actions'
import { fetchUser } from '@/lib/actions/user.actions'

import { currentUser } from "@clerk/nextjs/server";

import React from 'react'

const page = async ({params}:{params: {id: string}}) => {
  
    const thread = await fetchThreadById(params.id)

    const user = await currentUser();

    const userInfo = await fetchUser(user.id);


    if(!user || !userInfo){
      return (
        <h1 className = 'text-3xl text-white'>You Must Login To View This Thread Comments
        </h1>
      )
    }


  return (
    <div className="relative">
        <div>
        <ThreadCard 
              key = {thread._id} 
              author = {thread.author}
              text = {thread.text}
              id = {thread._id}
              parentId = {thread.parentId}
              createdAt = {thread.createdAt}
              comments = {thread.children}
              community = {thread.community}
              userId = {user?.id}
            
            />
        </div>
        <div className="mt-8">
          <Comment 
          threadId = {thread._id}
          currentUser = {userInfo._id}
          userImage = {userInfo.image}
          />
        </div>
        <div className = 'mt-8 flex flex-col gap-4 p-4'>
          {thread.children.length > 0 && (
            <>
            {
              thread.children.map((childThread: any) => <ThreadCard 
                key = {childThread._id} 
                author = {childThread.author}
                text = {childThread.text}
                id = {childThread._id}
                parentId = {childThread.parentId}
                createdAt = {childThread.createdAt}
                comments = {childThread.children}
                community = {childThread.community}
                userId = {user?.id}
                isComment
              />)
            }
            </>
          )}
        </div>
    </div>
  )
}

export default page