import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from '@/components/Menu';
import { Toaster } from "@/components/ui/toaster";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useLayoutEffect } from 'react';
import { logOutUser, setIsLoggedIn } from '@/features/user/userSlice';
import { verifyToken } from '@/lib/apiClient';


// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
    component: () => {
        const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
        const dispatch = useDispatch();

        useLayoutEffect(() => {

            async function handleVerifyUser() {
                try {
                    // TODO: check user is already logged-in  or not
                    // await verifyToken();
                    dispatch(setIsLoggedIn(true));
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
    },
});
