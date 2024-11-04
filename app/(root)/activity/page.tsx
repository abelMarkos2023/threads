import UserCard from "@/components/cards/UserCard";
import { fetchUser, getActivities } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from 'next/image' 
import Link from 'next/link'

async function Page(){

  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(user.id);

  

  if(!userInfo) return redirect('/');

  const activities = await getActivities(userInfo._id);


  return (
   <div className="mt-8">
    <h2 className="head-text">
        Activities
    </h2>

    <section className = 'flex flex-col gap-3 mt-8'>
    {
      activities?.length === 0 ? 
      (
        <h1 className = 'text-light-2 text-center text-2xl font-semibold '>No Activities JustYet
        </h1>
      ):(
        <>
          {
            activities?.map(activity => (
              <Link key = {activity._id} href = {`/reply/${activity.parentId}`} className='activity-card'>
                <div className = 'w-16 h-16 relative'>
                <Image  
                  fill
                  className = 'rounded-full object-cover'
                  src={activity.author.image}
                  alt='Profile Photo'
                />
                
                </div>
                <span className = 'text-light-2 text-base.semibold'>
                  <strong>{activity.author.name}</strong> 
                  {" "} Replied To Your Thread
                </span>
              </Link>
            ))
          }
        </>
      )
    }
    </section>
   </div>
  )
}

export default Page