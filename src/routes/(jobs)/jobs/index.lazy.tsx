import JobCard from '@/components/JobCard';
import { getJobs } from '@/lib/apiClient';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';

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


export const Route = createLazyFileRoute('/(jobs)/jobs/')({
    component: JobsPage,
    loader: jobsLoader,
});

function JobsPage() {
    const jobs = Route.useLoaderData({}) as JobItem[];
    const navigate = useNavigate();

    function handleGoToJobPage(id: string) {
        navigate({ to: `/job/${id}` });
    }

    if (!jobs || !jobs.length) return <h1>No Jobs here</h1>;

    return (
        <div className="flex flex-col gap-4 p-4 mt-4">
            {jobs.map(job =>
                <JobCard key={job._id} job={job} goToJobPage={handleGoToJobPage} />
            )}
        </div>
    );
}