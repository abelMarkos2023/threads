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
        Communities
    </h2>
   </div>
  )
}

export default Page