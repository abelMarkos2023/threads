import UserCard from "@/components/cards/UserCard";
import { fetchUser, searchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const Page = async() => {

  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(user?.id);

  

  if(!userInfo) return redirect('/');

  const searchResult = await searchUsers({
    userId: user.id,
    searchString:'',
    pageNumber:1,
    pageSize:20,
    sortBy: 'desc'
  })

  return (
   <div className="mt-8">
    <h2 className="head-text">
        Search
    </h2>

    {/* Search bar */}

    {
      !searchResult || searchResult.queryResult.length === 0 ? (
        <>
        <h1 className="no-result">No Users Found</h1>
        </>
      ) : (
        <div className="flex flex-col gap-8">
          {
            searchResult.queryResult.map(user => (
              <>
              <UserCard 
              key = {user.id}
              id = {user.id}
              name = {user.name}
              username = {user.username}
              image = {user.image}
              />
              </>
            ))
          }
        </div>
      )
    }
   </div>
  )
}

export default Page