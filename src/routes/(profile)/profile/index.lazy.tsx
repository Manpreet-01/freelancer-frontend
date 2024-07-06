import { Button } from '@/components/ui/button';
import { logOutUser } from '@/features/user/userSlice';
import { logOutUser as logOutUserApi } from '@/lib/apiClient';
import { RootState } from '@/store/store';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "@/components/ui/use-toast";
import ViewProfile from '@/components/profile/ViewProfile';

export const Route = createLazyFileRoute('/(profile)/profile/')({
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

  if (!user) return null;

  return (
    <div className='mt-4'>
      <ViewProfile user={user} />
      <div className='text-center'>
        <Button
          onClick={handleLogout}
        >Logout</Button>
      </div>
    </div>
  );
}