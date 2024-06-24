import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from '@/components/Menu';
import { Toaster } from "@/components/ui/toaster";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useLayoutEffect } from 'react';
import { getProfile } from '@/lib/apiClient';
import { logOutUser, setLoggedInUser } from '@/features/user/userSlice';


// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
    component: RootLayout,
});


function RootLayout() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        async function handleVerifyUser() {
            try {
                const res = await getProfile();
                const user = res.data.data.user;
                dispatch(setLoggedInUser(user));
            } catch (err) {
                console.log("err in verify user :: ", err);
                dispatch(logOutUser());
            }
        }

        handleVerifyUser();
    }, []);

    return (
        <>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <Menu isLoggedIn={isLoggedIn} />
                <Outlet />
                <Toaster />
            </ThemeProvider>
            {/* <TanStackRouterDevtools /> */}
        </>
    );
}