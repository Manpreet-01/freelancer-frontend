import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from '@/components/Menu';
import { Toaster } from "@/components/ui/toaster";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
    component: () => (
        <>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <Menu />
                <Outlet />
                <Toaster />
            </ThemeProvider>
            {/* <TanStackRouterDevtools /> */}
        </>
    ),
});
