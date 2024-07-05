import { useNavigate } from '@tanstack/react-router';
import { userData } from "@/types/user.types";
import { Button } from "../ui/button";
import { HeartButton } from "./HeartButton";
import { JobItem } from "@/types/job.types";
import { Edit, Trash2 } from "lucide-react";
import { MouseEvent, MouseEventHandler } from "react";

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
            <Button
                size="sm"
                className="hover:scale-110"
                onClick={handleGotoApplyJob}
            >
                Apply Job
            </Button>

            <HeartButton
                userId={user._id}
                job={job}
                size="sm"
                className="disabled:cursor-not-allowed hover:scale-110"
            />
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

            <Button variant="outline" size="sm" onClick={onDelete}
                className="text-red-500 cursor-pointer hover:scale-110 hover:bg-red-500"
            >
                <Trash2 />
            </Button>
        </>
    );
}