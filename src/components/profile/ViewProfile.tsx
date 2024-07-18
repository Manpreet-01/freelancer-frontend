import { UserData } from "@/types/user.types";

import profilePicPlaceHolder from '@/assets/vite.svg';

type ViewProfileProps = {
    user: UserData;
};

export default function ViewProfile({ user }: ViewProfileProps) {
    return (
        <div>
            <h1 className="text-2xl text-center font-bold mb-8">Profile</h1>
            <div className='flex justify-between mx-8'>
                <div className='flex flex-col gap-4 mt-4'>
                    <h1>Name: {user.name}</h1>
                    <p>Username: @{user.username}</p>
                    {user.email && <p>Email: {user.email}</p>}
                    <p>Role: {user.role}</p>
                    <p>Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
                    <p>Last Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
                </div>
                <div>
                    <img width={300} height={300} src={user.imgUrl || profilePicPlaceHolder} className='rounded-full border' />
                </div>
            </div>

        </div>
    );
}
