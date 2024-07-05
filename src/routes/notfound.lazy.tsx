import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/notfound')({
  component: () => <div className='min-h-screen flex justify-center items-center'>
    <h1 className='text-6xl'>404 Not Found!</h1>
  </div>
});