import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from '@/components/Menu';
import { Toaster } from "@/components/ui/toaster";
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import { getProfile } from '@/lib/apiClient';
import { logOutUser, setLoggedInUser } from '@/features/user/userSlice';
import { NotFound } from './notfound.lazy';
import { UserData } from '@/types/user.types';

// import { TanStackRouterDevtools } from '@tanstack/router-devtools';


async function handleVerifyLogin() {
    try {
        const user = store.getState().user;
        if (user.isLoggedIn) return console.log("user is logged in");

        console.log("trying verify details and logging in");
        const res = await getProfile();
        const loggedInUser: UserData = res.data.data.user;
        store.dispatch(setLoggedInUser(loggedInUser));
    } catch (err) {
        console.log("err in verify user :: ", err);
        store.dispatch(logOutUser());
    }
}

export const Route = createRootRoute({
    component: RootLayout,
    beforeLoad: handleVerifyLogin,
    errorComponent: NotFound,
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