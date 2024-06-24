import JobCard from '@/components/JobCard';
import { toast } from '@/components/ui/use-toast';
import { getJobs } from '@/lib/apiClient';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import type { JobItem } from '@/types/job.types';

export const Route = createLazyFileRoute('/jobs')({
  component: JobsPage,
});

function JobsPage() {
  const [jobs, setJobs] = useState<JobItem[]>();

  useEffect(() => {
    async function getJobsHandler() {
      try {
        const res = await getJobs();
        const jobs = res.data.data.jobs;
        console.log(" jobs ;;;;; ", jobs);

        setJobs(jobs as JobItem[]);
      }
      catch (error) {
        toast({
          title: "Error",
          description: 'Failed to load jobs. Please try again.',
          variant: 'destructive'
        });
      }
    }

    getJobsHandler();
  }, []);

  if (!jobs) return <h1>No Jobs here</h1>;

  return (
    <div className='m-4'>
      <h1 className='m-8 text-3xl font-bold'>All jobs</h1>

      <div className="flex flex-col gap-4">
        {jobs.map(job => <JobCard key={job._id} job={job} />)}
      </div>
    </div>
  );
}