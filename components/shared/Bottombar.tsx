'use client'


import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { sidebarLinks } from '@/constants'


const Bottombar = () => {
  const pathname = usePathname();

  return (
    <div className="bottombar">
      <div className = "bottombar_container">
        {
           sidebarLinks.map(link => {
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || link.route == pathname
            return (
              <Link
              key={link.route}
              href={link.label}
              className={`bottombar_link ${isActive && 'bg-blue-400'}`}
              >
                <Image 
                height={'24'}
                 width={24} 
                 alt={link.label} 
                 src={link.imgURL}/>
  
                 <p className='max-sm:hidden text-subtle-medium text-light-1'>{link.label.split(' ')[0]}</p>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default Bottombar