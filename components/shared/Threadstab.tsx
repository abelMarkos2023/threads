import { fetchUserThreads } from "@/lib/actions/user.actions";
import ThreadCard from '@/components/cards/ThreadCard'

interface IProps {
    accountId: string;
    userId: string;
    accountType: string;
}

export default async function Threadstab({accountId,userId,accountType}:IProps){

    const userThreads = await fetchUserThreads(accountId)

    console.log(userThreads.threads)
    

    return (
        <div className = 'flex flex-col gap-3'>
            {
                userThreads?.threads?.map((thread: any) => (
                    <ThreadCard 
                    key = {thread._id} 
                    author = {accountType === 'User' ? thread.author : thread.author}
                    text = {thread.text}
                    id = {thread._id}
                    parentId = {thread.parentId}
                    createdAt = {thread.createdAt}
                    comments = {thread.children}
                    community = {thread.community}
                    userId = {userThreads._id}
                  
                  />
                ))
            }
        </div>
    )
}