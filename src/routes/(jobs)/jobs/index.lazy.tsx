import JobCard from '@/components/JobCard';
import { getClientJobs, getJobs } from '@/lib/apiClient';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';

import type { JobItem } from '@/types/job.types';
import { toast } from '@/components/ui/use-toast';
import { RootState, store } from '@/store/store';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

export async function jobsLoader() {
    try {
        const user = store.getState().user.userData;

        function getApi() {
            if (user?.role === 'client') {
                return getClientJobs(user._id);
            }
            else if (user?.role === 'freelancer') {
                return getJobs();
            }
            else {
                const msg = "Invalid client role detected.";
                console.error(msg);
                alert(msg);
                throw new Error(msg);
            }
        }

        const res = await getApi();
        // @ts-ignore
        const jobs = res.data?.data?.jobs;
        console.log(" jobs ;;;;; ", jobs);
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
    // @ts-ignore
    loader: jobsLoader,
});

function JobsPage() {
    const jobs = Route.useLoaderData({}) as JobItem[];
    const user = useSelector((state: RootState) => state.user.userData);

    const navigate = useNavigate();

    function handleGoToJobPage(id: string) {
        navigate({ to: `/job/${id}` });
    }

    function handlePostOnClick() {
        navigate({ to: '/job/post' });
    }


    return (
        <>
            {!jobs.length && (
                <h1>No Jobs here</h1>
            )}

            {user?.role == "client" && (
                <div className='flex m-2 px-4 justify-end'>
                    <Button onClick={handlePostOnClick}>Post</Button>
                </div>
            )}

            <div className="flex flex-col gap-4 p-4 mt-4">
                {jobs.map(job =>
                    <JobCard key={job._id} job={job} goToJobPage={handleGoToJobPage} />
                )}
            </div>

        </>
    );
}