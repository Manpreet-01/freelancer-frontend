import JobCard from '@/components/JobCard';
import { getJobs } from '@/lib/apiClient';
import { createLazyFileRoute, useLoaderData } from '@tanstack/react-router';

import type { JobItem } from '@/types/job.types';
import { toast } from '@/components/ui/use-toast';

export async function jobsLoader() {
  try {
    const res = await getJobs();
    const jobs = res.data.data.jobs;
    // console.log(" jobs ;;;;; ", jobs);
    return jobs;
  }
  catch (error) {
    toast({
      title: "Error",
      description: 'Failed to load jobs.',
      variant: 'destructive'
    });
    console.error("err in fetching jobs ---> ", error);
    return [];
  }
}


export const Route = createLazyFileRoute('/jobs')({
  component: JobsPage,
  loader: jobsLoader,
});

function JobsPage() {
  const jobs = useLoaderData({ from: '/jobs' }) as JobItem[];

  if (!jobs || !jobs.length) return <h1>No Jobs here</h1>;

  return (
    <div className='m-4'>
      <h1 className='m-8 text-3xl font-bold'>All jobs</h1>

      <div className="flex flex-col gap-4">
        {jobs.map(job => <JobCard key={job._id} job={job} />)}
      </div>
    </div>
  );
}