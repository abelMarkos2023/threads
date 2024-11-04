import Image from "next/image";

interface IProp {
    profileUserId: string;
    authUserId: string;
    image: string;
    name: string;
    username: string;
    bio: string
}

const ProfileHeader = ({profileUserId,authUserId,image,name,username,bio}:IProp) => {
    return (
        <div className = 'w-full flex flex-col items-start'>
            <div className = 'flex items-center justify-between'>
                <div className="flex items-center gap-3">
                    <div className="w-16 h-16 relative">
                        <Image
                        className="rounded-full object-cover shadow-2xl"
                        fill
                        src={image}
                        alt="Profile Photo" 
                        />
                    </div>
                    <p className="flex-1">
                        <h3 className="text-light-1 text-heading2-bold">{name}</h3>
                        <h4 className="text-gray-1 text-base-regular">@{username}</h4>
                    </p>
                </div>
            </div>

            <p className="text-base-regular text-light-2 max-w-lg mt-8">
                {bio}
            </p>
            <div className="mt-8 h-0.5 bg-gray-1 w-full" />

        </div>
    )
}

export default ProfileHeader;