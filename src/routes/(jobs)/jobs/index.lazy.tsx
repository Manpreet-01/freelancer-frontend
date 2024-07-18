import JobCard from '@/components/job/JobCard';
import { getClientJobs, getJobs } from '@/lib/apiClient';
import { createLazyFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import type { JobItem } from '@/types/job.types';
import { toast } from '@/components/ui/use-toast';
import { RootState, store } from '@/store/store';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { getApiErrMsg } from '@/lib/utils';
import { deleteJobPayload } from "@/routes/(jobs)/job/$_id.lazy";
import { deleteJob } from "@/lib/apiClient";

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
        function getApi() {
            if (user?.role === 'client') {
                return getClientJobs();
            }
            else if (user?.role === 'freelancer') {
                return getJobs();
            }
        }

        const res = await getApi();
        // @ts-ignore
        const jobs = res.data?.data?.jobs;
        console.log(" jobs ;;;;; ", jobs);
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
    const jobs = Route.useLoaderData({}) as JobItem[];
    const user = useSelector((state: RootState) => state.user.userData);

    const navigate = useNavigate();

    const handlePostOnClick = () => navigate({ to: '/job/post' });
    const handleGoToJobPage = (jobId: string) => navigate({ to: `/job/${jobId}` });
    const handleGoToEditJob = (jobId: string) => navigate({ to: `/job/edit/${jobId}` });

    async function handleDeleteJob(jobId: string) {
        const payload: deleteJobPayload = {
            jobId,
            userId: user?._id || ""
        };

        try {
            const res = await deleteJob(payload);

            toast({
                title: "Success!",
                description: res.data.message || "Job deleted successfully",
                variant: 'success'
            });

            navigate({ to: '' });  // refresh page after delete job
        }
        catch (err: any) {
            console.error('err in delete job --- ');
            console.error(err);

            toast({
                title: 'Failed to delete job.',
                description: getApiErrMsg(err, 'Failed to delete job.'),
                variant: 'destructive'
            });
        }
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
                    <JobCard
                        key={job._id}
                        job={job}
                        user={user}
                        goToJobPage={handleGoToJobPage}
                        onEdit={handleGoToEditJob}
                        onDelete={handleDeleteJob}
                    />
                )}
            </div>

        </>
    );
};