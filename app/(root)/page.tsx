import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs/server";
import ThreadCard from '@/components/cards/ThreadCard'
export default async function Home() {

  const data = await fetchThreads();
  const user = await currentUser()

  // if there are no threads, display a message
  if(data.threads.length == 0 ){
    return <h1 className = 'head-text'>There Are No Threads</h1>
  }


  return (
    <main className="flex flex-col gap-8 mt-4">
      <h2 className = 'head-text'>Home</h2>
        {
          data.threads.map(thread => (
            <ThreadCard 
              key = {thread._id} 
              author = {thread.author}
              text = {thread.text}
              id = {thread._id}
              parentId = {thread.parentId}
              createdAt = {thread.createdAt}
              comments = {thread.children}
              community = {thread.community}
             
            
            />
          ))
        }
    </main>
  );
}
