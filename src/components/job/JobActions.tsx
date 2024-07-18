import { useNavigate } from '@tanstack/react-router';
import { userData } from "@/types/user.types";
import { Button } from "../ui/button";
import { HeartButton } from "./HeartButton";
import { JobItem } from "@/types/job.types";
import { Edit, Trash2 } from "lucide-react";
import { MouseEvent, MouseEventHandler } from "react";
import { Accepted, Applied, ApplyJob, Rejected, Withdrawn } from './_JobActions_misc';
import { ConfirmPopup } from '../AlertDialogue';


type FreelancerJobActionsProps = {
    user: userData,
    job: JobItem,
};


export function FreelancerJobActions({ user, job }: FreelancerJobActionsProps) {
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

            <HeartButton userId={user._id} job={job} size="sm" className="disabled:cursor-not-allowed hover:scale-110" />
        </>
    );
}

type ClientJobActionsProps = {
    onEdit: MouseEventHandler<HTMLButtonElement>,
    onDelete: MouseEventHandler<HTMLButtonElement>,
};

export function ClientJobActions({ onEdit, onDelete }: ClientJobActionsProps) {
    return (
        <>
            <Button variant="outline" size="sm" onClick={onEdit}
                className="cursor-pointer hover:scale-110"
            >
                <Edit />
            </Button>

            <ConfirmPopup
                variant="outline"
                size="sm"
                className="text-red-500 cursor-pointer hover:scale-110 hover:bg-red-500"
                onContinue={onDelete}
            >
                <Trash2 />
            </ConfirmPopup>

        </>
    );
}