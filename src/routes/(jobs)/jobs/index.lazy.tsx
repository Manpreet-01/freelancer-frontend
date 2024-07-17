import JobCard from '@/components/job/JobCard';
import { getClientJobs, getJobs } from '@/lib/apiClient';
import { createLazyFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import type { JobItem } from '@/types/job.types';
import { toast } from '@/components/ui/use-toast';
import { RootState, store } from '@/store/store';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { getApiErrMsg } from '@/lib/utils';
import { setJobs } from '@/features/job/jobSlice';

export const Route = createLazyFileRoute('/(jobs)/jobs/')({
    // @ts-ignore
    loader: jobsLoader,
    component: JobsPage,
});

async function jobsLoader() {
    const user = store.getState().user.userData;
    if (!user) {
        throw redirect({
            to: '/login',
        });
    }

    try {
        // try to get from store
        const storedJobs = store.getState().job.jobs;
        if (storedJobs?.length > 0) return storedJobs;

        // else fetch from api
        function getApi() {
            if (user?.role === 'client') {
                return getClientJobs();
            }
            else if (user?.role === 'freelancer') {
                return getJobs();
            }
        }

        const res = await getApi();
        const jobs: JobItem[] = res?.data?.data?.jobs;
        store.dispatch(setJobs(jobs));
        return jobs;
    }
    catch (err) {
        toast({
            title: "Error",
            description: getApiErrMsg(err, 'Failed to load jobs.'),
            variant: 'destructive'
        });
        console.error("err in fetching jobs ---> ", err);
        return [];
    }
}

function JobsPage() {
    const user = useSelector((state: RootState) => state.user.userData);
    const jobs = useSelector((state: RootState) => state.job.jobs);

    const navigate = useNavigate();

    const handlePostOnClick = () => navigate({ to: '/job/post' });

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
                {jobs.map(job => <JobCard key={job._id} job={job} />)}
            </div>

        </>
    );
};