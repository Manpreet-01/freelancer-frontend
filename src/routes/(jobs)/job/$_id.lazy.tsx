import JobPage from '@/components/job/JobPage';
import { AcceptOrRejectProposal, acceptOrRejectProposal, cancelJob, getJobByid, submitProposal, updateProposal, withdrawProposal } from '@/lib/apiClient';
import type { JobItem } from '@/types/job.types';
import { createLazyFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import { toast } from '@/components/ui/use-toast';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import { getApiErrMsg } from '@/lib/utils';
import { useEffect } from 'react';


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
    const res = await getJobByid(_id);
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


export type cancelJobPayload = {
  userId: string,
  jobId: string,
};

type SearchParamsType = {
  applying: boolean,
  editingProposal: boolean;
};

function JobPageLayout() {
  const user = useSelector((state: RootState) => state.user.userData!);

  const job = Route.useLoaderData<JobItem>();
  const { applying: isApplying, editingProposal: isEditingPropoal } = Route.useSearch<SearchParamsType>();

  const navigate = useNavigate();

  useEffect(() => {
    if (isApplying && isEditingPropoal) navigate({ to: '/notfound' });
    console.log('validating urls params');
  }, [!!isApplying, !!isEditingPropoal]);

  async function handlecancelJob() {
    const payload: cancelJobPayload = {
      jobId: job._id || "",
      userId: user._id || ""
    };

    try {
      const res = await cancelJob(payload);

      toast({
        title: "Success!",
        description: res.data.message || "Job canceled successfully",
        variant: 'success'
      });

      navigate({ to: '/jobs' });
    }
    catch (err: any) {
      console.error('err in cancel job --- ');
      console.error(err);

      toast({
        title: 'Failed to cancel job.',
        description: getApiErrMsg(err, 'Failed to cancel job.'),
        variant: 'destructive'
      });
    }
  }

  const handleCancelProposal = () => navigate({ to: `/job/${job._id}` });
  const handleGoToEditJob = () => navigate({ to: `/job/edit/${job._id}` });

  async function handleSubmitProposal(coverLetter: string) {
    try {
      const payload = { jobId: job._id, coverLetter };
      let res = null;

      if (isEditingPropoal) res = await updateProposal(payload);
      else if (isApplying) res = await submitProposal(payload);

      if (!res) {
        alert("wrong params provided");
        navigate({ to: '/notfound' });
        return;
      }

      const data = res.data.data;
      console.log("proposal submitted :  ", data);
      toast({
        title: "Success!",
        description: res.data.message || "Proposal submitted successfully",
        variant: 'success'
      });
      navigate({ to: `/job/${job._id}` });
    } catch (err: any) {
      console.error("error in submitting proposal ::  ", getApiErrMsg(err, 'failed to submit proposal'));
      toast({
        title: 'Failed to Submit Proposal',
        description: getApiErrMsg(err, 'Failed to submit proposal'),
        variant: 'destructive'
      });
    }
  }

  const handleEditProposal = () => navigate({ search: () => ({ editingProposal: true }) });

  async function handlewithdrawProposal() {
    try {
      const res = await withdrawProposal({ jobId: job._id });
      toast({
        title: "Success!",
        description: res.data.message || "Job propsoal drawn successfully",
        variant: 'success'
      });
    } catch (err: any) {
      console.error("err in withdraw proposal", err);
      toast({
        title: 'Oops! An Error Occured',
        description: getApiErrMsg(err, "Unable to withdraw Job Proposal"),
        variant: 'destructive'
      });
    }
    finally {
      navigate({ search: '' }); // logic for update the status & ui
    }
  }

  async function setProposalStatus({ proposalId, status }: AcceptOrRejectProposal) {
    try {
      await acceptOrRejectProposal({ jobId: job._id, proposalId, status });
      toast({
        title: "Success!",
        description: `Proposal ${status} successfully`,
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Oops! An Error Occured',
        description: getApiErrMsg(error, `Unable to ${status} proposal`),
        variant: 'destructive'
      });
    }
    finally {
      navigate({ search: '' }); // logic for update the status & ui
    }
  }

  if (!job) return null;
  return (
    <>
      <JobPage
        job={job}
        user={user}
        isApplying={isApplying}
        isEditingPropoal={isEditingPropoal}
        onCancelJob={handlecancelJob}
        onEdit={handleGoToEditJob}
        onCancelProposal={handleCancelProposal}
        onSubmitProposal={handleSubmitProposal}
        onEditProposal={handleEditProposal}
        onWithdrawProposal={handlewithdrawProposal}
        setProposalStatus={setProposalStatus}
      />
    </>
  );
}