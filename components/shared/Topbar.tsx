import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {dark} from '@clerk/themes'
import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs'
const Topbar = () => {
  return (
   <nav className = 'topbar'>
    <Link href = '/' className = 'flex items-center gap-2'>
    <Image src = '/logo.svg' alt = 'logo' width = {28} height = {28}/>
    <p className = 'text-heading3-bold text-light-1 maax-xs:hidden'>Threads</p>
    </Link>
    <div className = 'flex items-center gap-1'>
      <div className="block md:hidden">
      <SignedIn>
        <SignOutButton>
          <div className="flex cursor-pointer">
            <Image width={24} height={24} src={'/assets/logo.svg'} alt='logo'/>
          </div>
        </SignOutButton>
      </SignedIn>
      </div>
      <OrganizationSwitcher 
      appearance={{
        baseTheme:dark,
        elements:{
          organizationSwitcherTrigger:"py-3 px-2"
        }
      }}
      />
    </div>
   </nav>
  )
}

export default Topbar