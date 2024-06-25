import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from '@/components/Menu';
import { Toaster } from "@/components/ui/toaster";
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import { getProfile } from '@/lib/apiClient';
import { logOutUser, setLoggedInUser } from '@/features/user/userSlice';

// import { TanStackRouterDevtools } from '@tanstack/router-devtools';


async function handleVerifyLogin() {
    try {
        const res = await getProfile();
        const user = res.data.data.user;
        store.dispatch(setLoggedInUser(user));
    } catch (err) {
        console.log("err in verify user :: ", err);
        store.dispatch(logOutUser());
    }
}

export const Route = createRootRoute({
    component: RootLayout,
    beforeLoad: handleVerifyLogin,
});


function RootLayout() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

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