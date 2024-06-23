import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from '@/components/Menu';
import { Toaster } from "@/components/ui/toaster";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect } from 'react';
import { setIsLoggedIn } from '@/features/user/userSlice';


// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
    component: () => {
        const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
        const dispatch = useDispatch();

        useEffect(() => {
            // TODO: check user is already logged-in  or not
            // dispatch(setIsLoggedIn(false));
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
