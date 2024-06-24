import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/search-jobs')({
  component: JobSearchPage
});

function JobSearchPage() {
  return (
    <div>
      <h1 className='text-2xl'>Search Jobs</h1>
      </div>
  );
}