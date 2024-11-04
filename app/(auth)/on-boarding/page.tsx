import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs/server";

async function OnBoarding(){

    const user = await currentUser();

    const userInfo = {};

    const userData = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo?.username || user.username,
        name: userInfo?.name || user?.firstName || '',
        bio: userInfo?.bio || '',
        image: userInfo?.image || user?.imageUrl
    }

    return (
        <div className="flex flex-col mx-auto max-w-3xl mt-10">
            <h1 className="head-text mb-4 text-light-1">On Boarding</h1>
            <p className="text-base-regular text-light-2 text-lg">Compelete Your Profile Now To Start Using Thread

            </p>
            <div className="mt-3 p-10 bg-dark-2 rounded-lg">
                <AccountProfile
                 user = {userData}
                 btnTitle = "Continue"
                />
            </div>
        </div>
    )
}

export default OnBoarding;