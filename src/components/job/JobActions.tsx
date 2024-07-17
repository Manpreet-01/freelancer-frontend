import { useNavigate } from '@tanstack/react-router';
import { Button } from "../ui/button";
import { HeartButton } from "./HeartButton";
import { JobItem } from "@/types/job.types";
import { Edit, Trash2 } from "lucide-react";
import { MouseEvent } from "react";
import { Accepted, Applied, ApplyJob, Rejected, Withdrawn } from './_JobActions_misc';
import { toast } from '@/components/ui/use-toast';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJobPayload } from "@/routes/(jobs)/job/$_id.lazy";
import { deleteJob as deleteJobApi } from "@/lib/apiClient";
import { deleteJob } from '@/features/job/jobSlice';


export function FreelancerJobActions({ job }: { job: JobItem; }) {
    const navigate = useNavigate();

    function handleGotoApplyJob(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        navigate({ to: `/job/$_id`, params: { _id: job._id }, search: { applying: true } });
    }

    return (
        <>
            {!job.isApplied ? <ApplyJob onClick={handleGotoApplyJob} /> :
                job.isWithdrawn ? <Withdrawn /> :
                    job.proposal?.status === 'accepted' ? <Accepted /> :
                        job.proposal?.status === 'rejected' ? <Rejected /> :
                            <Applied />
            }

            <HeartButton job={job} size="sm" className="disabled:cursor-not-allowed hover:scale-110" />
        </>
    );
}


export function ClientJobActions({ jobId }: { jobId: string; }) {
    const user = useSelector((state: RootState) => state.user.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleJobDelete(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();

        const payload: deleteJobPayload = {
            jobId,
            userId: user?._id || ""
        };

        try {
            const res = await deleteJobApi(payload);

            toast({
                title: "Success!",
                description: res.data.message || "Job deleted successfully",
                variant: 'success'
            });

            dispatch(deleteJob(jobId));
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

    function handleJobEdit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        navigate({ to: `/job/edit/${jobId}` });
    }

    return (
        <>
            <Button variant="outline" size="sm" onClick={handleJobEdit}
                className="cursor-pointer hover:scale-110"
            >
                <Edit />
            </Button>

            <Button variant="outline" size="sm" onClick={handleJobDelete}
                className="text-red-500 cursor-pointer hover:scale-110 hover:bg-red-500"
            >
                <Trash2 />
            </Button>
        </>
    );
}