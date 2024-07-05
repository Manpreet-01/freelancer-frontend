import JobPage from '@/components/job/JobPage';
import { deleteJob, getJobsById } from '@/lib/apiClient';
import type { JobItem } from '@/types/job.types';
import { createLazyFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import { toast } from '@/components/ui/use-toast';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import { getApiErrMsg } from '@/lib/utils';


export const Route = createLazyFileRoute('/(jobs)/job/$_id')({
  // @ts-ignore
  loader: jobPageLoader,
  component: JobPageLayout,
});


type Params = {
  _id: string;
};

async function jobPageLoader({ params: { _id } }: { params: Params; }) {
  const user = store.getState().user.userData;
  if (!user) {
    throw redirect({
      to: '/login',
    });
  }

  try {
    const res = await getJobsById(_id);
    const job = res.data.data.job;
    if (!job) {
      throw redirect({
        to: '/notfound',
      });
    }
    return job;
  }
  catch (error: any) {
    console.error("error in fetch job with id");
    console.error(error);

    toast({
      title: 'Oops! An Error Occured',
      description: getApiErrMsg(error, "Unable to get the Job"),
      variant: 'destructive'
    });

    throw redirect({
      to: '/notfound',
    });
  }
}


export type deleteJobPayload = {
  userId: string,
  jobId: string,
};

function JobPageLayout() {
  const user = useSelector((state: RootState) => state.user.userData);
  const job = Route.useLoaderData<JobItem | null>();
  const { applying: isApplying } = Route.useSearch<{ applying: boolean; }>();

  const navigate = useNavigate();

  async function handleDeleteJob() {
    const payload: deleteJobPayload = {
      jobId: job?._id || "",
      userId: user?._id || ""
    };

    try {
      const res = await deleteJob(payload);

      toast({
        title: "Success!",
        description: res.data.message || "Job deleted successfully",
        variant: 'success'
      });

      navigate({ to: '/jobs' });
    }
    catch (err: any) {
      console.error('err in delete job --- ');
      console.error(err);

      toast({
        title: 'Failed to delete job.',
        description: err.response.data.message,
        variant: 'destructive'
      });
    }
  }

  const handleCancelProposal = () => navigate({ to: `/job/${job?._id}` });
  const handleGoToEditJob = () => navigate({ to: `/job/edit/${job?._id}` });

  // TODO: write logic for submit / crete proposal here...
  async function handleSubmitProposal(jobId) {
    console.log("submitted for JobId : ", jobId);
  }

  if (!job) return null;
  return (
    <>
      <JobPage
        job={job}
        user={user}
        isApplying={isApplying}
        onDelete={handleDeleteJob}
        onEdit={handleGoToEditJob}
        onCancelProposal={handleCancelProposal}
        onSubmitProposal={handleSubmitProposal}
      />
    </>
  );
}