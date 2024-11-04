import PostThread from "@/components/forms/PostThread";
import { fetchUser,fetchUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfileHeader from '@/components/shared/ProfileHeader'
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs'
import ThreadsTab from '@/components/shared/Threadstab'

import { profileTabs } from "@/constants";
import Image from  'next/image'

const Profile = async ({params}:{params:{id:string}}) => {

    const user = await currentUser();

    if(!user) return null;

    const loggedUser = await fetchUser(user.id);
    const profileUser = await fetchUser(params.id);
    

    if(!loggedUser || !profileUser) return redirect('/');


    return (
        <>
        <div>
            <ProfileHeader 
            profileUserId = {profileUser._id}
            authUserId = {loggedUser._id}
            image = {profileUser.image}
            name = {profileUser.name}
            username = {profileUser.username}
            bio = {profileUser.bio}
            />
        </div>

        <div className="mt-9">
            <Tabs defaultValue = 'threads' className = 'w-full'>
                <TabsList className = 'tab'>
                    {
                        profileTabs.map(tab => (
                            <TabsTrigger key = {tab.label} value = {tab.value} className = 'tab'>
                                <Image 
                                width = {24}
                                height = {24}
                                src = {tab.icon}
                                alt = 'Icon'
                                className = 'object-contain'
                                />
                                <p className = 'max-sm:hidden'>{tab.label}</p>
                                {
                                    tab.label === 'Threads' && (
                                        <p className = 'ml-1 bg-dark-4 text-light-2 px-3 py-1'>{profileUser?.threads?.length}</p>
                                    )
                                }
                            </TabsTrigger>
                        ))
                    }
                </TabsList>
                {
                    profileTabs.map(tab => (
                        <TabsContent className = 'w-full text-light-1' key = {`content-${tab.label}`} value = {tab.value} >
                            <ThreadsTab 
                            accountId = {profileUser._id}
                            userId = {loggedUser._id}
                            accountType = 'User'
                            />
                        </TabsContent>
                    ))
                }
            </Tabs>

            
        </div>
        </>
    )
}
export default Profile;