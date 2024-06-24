import { Button } from '@/components/ui/button';
import { logOutUser } from '@/features/user/userSlice';
import { logOutUser as logOutUserApi } from '@/lib/apiClient';
import { RootState } from '@/store/store';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "@/components/ui/use-toast";

export const Route = createLazyFileRoute('/profile')({
  component: ProfilePage,
});


function ProfilePage() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: '/login' });
      return;
    }
  }, [isLoggedIn]);

  async function handleLogout() {
    try {
      const res = await logOutUserApi();
      dispatch(logOutUser());
      toast({
        title: "Logout Successful!",
        description: res.data.message || "User Logout successfully",
        variant: 'success'
      });
    }
    catch (err: any) {
      console.error("err in logout :: ", err);
      toast({
        title: "Logout failed!",
        description: err.data.message || "Error in Logout",
        variant: 'destructive'
      });
    }
  }

  return (
    <div className='mt-16'>

      {isLoggedIn && user && (
        <>
          <div className='flex justify-between mx-8'>
            <div className='flex flex-col gap-4 mt-4'>
              <h1 className='text-2xl'>Hello {user.name}</h1>
              <p>username: @{user.username}</p>
              <p>email: {user.email}</p>
              <p>role: {user.role}</p>
              <p>joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
              <p>last Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
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