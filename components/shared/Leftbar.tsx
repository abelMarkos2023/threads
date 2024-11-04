"use client"

import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { SignedIn, SignOutButton,useAuth } from '@clerk/nextjs'


const Leftbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {userId} = useAuth();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-4 py-4">
        {
          sidebarLinks.map(link => {
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || link.route == pathname
            if(link.route === '/profile') link.route = `/profile/${userId}`
            return (
              <Link
              key={link.route}
              href={link.route}
              className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
              >
                <Image 
                height={'24'}
                 width={24} 
                 alt={link.label} 
                 src={link.imgURL}/>
  
                 <p className='max-lg:hidden text-light-1'>{link.label}</p>
              </Link>
            )
          })
        }
      </div>
      <div className = 'mt-10 mx-6'>
      <SignedIn>
        <SignOutButton signOutCallback = {() => router.push('/sign-in')}>
          <div className="flex cursor-pointer gap-4">
            <Image width={24} height={24} src={'/assets/logo.svg'} alt='logo'/>
            <p className = "text-light-1">Logout</p>
          </div>
        </SignOutButton>
      </SignedIn>
      </div>
    </section>
  )
}

export default Leftbar