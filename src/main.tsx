import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import './index.css';
import { Loader2 } from 'lucide-react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { routeTree } from './routeTree.gen'; // Import the generated route tree


// Create a new router instance
const router = createRouter({
    routeTree,
    defaultPendingComponent: () => (
        <div className="p-2 text-2xl min-h-screen flex justify-center items-center">
            <Loader2 className='w-20 h-20 animate-spin' />
        </div>
    ),
});


// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}


const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </StrictMode>,
    );
}
