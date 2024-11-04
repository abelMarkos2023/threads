"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

interface IProp {
    name: string;
    username: string;
    id: string;
    image: string;
}
const UserCard = ({id,name,username,image} : IProp) => {

    const router = useRouter()
  return (
    <div className='user-card mt-4'>
        <div className="user-card_avatar">
            <div className = 'relative w-16 h-16'>
            <Image 
                src = {image}
                alt = 'Profile Photo'
                fill
                className='rounded-full object-cover shrink-0'
            />
            </div>
       
        <div className="flex-1 text-ellipsis">
            <h3 className="text-base-semibold text-light-1">{name}</h3>
            <p className="text-small-semibold text-gray-1">@{username}</p>
        </div>
        </div>
        <button className="user-card_btn px-6 py-2 text-md" onClick = {() => router.push(`/profile/${id}`)}>View</button>
    </div>
  )
}

export default UserCard