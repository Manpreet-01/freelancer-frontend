import { Button } from '@/components/ui/button';
import { logOutUser } from '@/features/user/userSlice';
import { getProfile, logoutUser } from '@/lib/apiClient';
import { RootState } from '@/store/store';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Route = createLazyFileRoute('/profile')({
  component: ProfilePage,
});


const profileDemo = {
  "_id": "6671908d4fe376c3ac316eae",
  "name": "harry",
  "username": "harry",
  "email": "harry8@gmail.com",
  "role": "freelancer",
  "createdAt": "2024-06-18T13:50:05.884Z",
  "updatedAt": "2024-06-18T13:50:05.884Z",
  "__v": 0
};

function ProfilePage() {
  const [profile, setProfile] = useState<null | typeof profileDemo>(null);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: '/login' });
      return;
    }

    async function handleGetProfile() {
      try {
        const res = await getProfile();
        const userProfile = res?.data?.data?.user;

        setProfile(userProfile);
      }
      catch (error: any) {
        console.error('err during getting profile :: ', error);
        if (error.response?.status == 401 || error.response?.status == 403) {
          dispatch(logOutUser());
          return;
        }
      }
    }

    handleGetProfile();
  }, [isLoggedIn]);

  async function handleLogout() {
    try {
      await logoutUser();
      setProfile(null);
      dispatch(logOutUser());
    }
    catch (err) {
      console.error("err in logout :: ", err);
    }
  }

  return (
    <div className='mt-16'>

      {profile && (
        <>
          <div className='flex justify-between mx-8'>
            <div className='flex flex-col gap-4 mt-4'>
              <h1 className='text-2xl'>Hello {profile.name}</h1>
              <p>username: @{profile.username}</p>
              <p>email: {profile.email}</p>
              <p>role: {profile.role}</p>
              <p>joined on: {new Date(profile.createdAt).toLocaleDateString()}</p>
              <p>last Updated: {new Date(profile.updatedAt).toLocaleDateString()}</p>
            </div>
            <div>
              <img width={400} height={400} src='vite.svg' className='rounded-2xl p-6 border' />
            </div>
          </div>
          <div className='text-center'>
            <Button
              onClick={handleLogout}
            >Logout</Button>
          </div>
        </>
      )}
    </div>
  );
}