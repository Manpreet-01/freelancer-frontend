import { timeSince } from "@/lib/timeFormatter";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, Tags, Timer, TimerReset, Wallet } from "lucide-react";
import type { JobItem } from "@/types/job.types";
import { userData } from "@/types/user.types";
import { ClientJobActions, FreelancerJobActions } from "./JobActions";
import { Textarea } from '@/components/ui/textarea';
import { useState } from "react";
import { Button } from "../ui/button";

type JobPageProps = {
    job: JobItem,
    user: userData | null,
    onDelete: any,
    onEdit: any;
    isApplying: boolean,
    onCancelProposal: () => void,
    onSubmitProposal: (jobId: string) => void,
};

export default function JobPage({ job, user, onDelete, onEdit, isApplying,
    onCancelProposal, onSubmitProposal }: JobPageProps) {

    return (
        <>
            <Card className="m-4 mt-8 p-2">
                <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-y-2">
                    <div className="flex gap-x-2">
                        <Wallet className="mr-1" />
                        <div className="flex items-center text-sm">
                            <DollarSign className="w-4 h-4" /><span>5.00</span>
                            <span className="mx-2">-</span>
                            <DollarSign className="w-4 h-4" /><span>8.00</span>
                        </div>
                    </div>

                    <div className="flex gap-x-2">
                        <Timer />
                        <span className="ml-2">Hourly</span>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <TimerReset className="mr-1" />
                        {timeSince(job.createdAt)}
                    </div>

                    <CardDescription className="whitespace-break-spaces my-4 text-md">{job.description}</CardDescription>
                </CardContent>

                <CardFooter className="flex flex-col items-start gap-y-4">
                    <div className="flex flex-wrap gap-2">
                        {(job.categories.length != 0 || job.tags.length) != 0 && <Tags className="mr-2" />}
                        {job.categories.map(category => (
                            <Badge key={category}>{category}</Badge>
                        ))}

                        {job.tags.map(tag => (
                            <Badge variant="outline" key={tag}>{tag}</Badge>
                        ))}
                    </div>

                    {user?.role === 'client' &&
                        <div className="flex gap-x-4 pr-4 justify-end w-full">
                            <ClientJobActions onEdit={onEdit} onDelete={onDelete} />
                        </div>
                    }

                    {user?.role === 'freelancer' && !isApplying &&
                        <div className="flex gap-x-4 pr-4 justify-end w-full">
                            <FreelancerJobActions user={user} job={job} />
                        </div>
                    }
                </CardFooter>
            </Card>

            {isApplying &&
                <CreateProposal
                    jobId={job._id}
                    onCancel={onCancelProposal}
                    onSubmit={onSubmitProposal}
                />
            }
        </>
    );
};


type CreateProposalProps = {
    jobId: string,
    onCancel: JobPageProps["onCancelProposal"],
    onSubmit: JobPageProps["onSubmitProposal"],
};

function CreateProposal({ jobId, onCancel, onSubmit }: CreateProposalProps) {
    const [coverLetter, setCoverLetter] = useState('');

    function handleSubmit() {
        onSubmit(jobId);
    }

    return (
        <>
            <Card className='m-4 p-2'>
                <CardHeader>
                    <CardTitle>Cover Letter</CardTitle>
                    <CardDescription>Write your proposal to apply for this job</CardDescription>
                </CardHeader>

                <CardDescription className="p-4">
                    <Textarea rows={10} value={coverLetter} onChange={e => setCoverLetter(e.target.value)} />
                </CardDescription>

                <CardFooter className="flex justify-end gap-x-4 py-4 w-full">
                    <Button
                        size="sm"
                        className="hover:scale-110"
                        onClick={handleSubmit}
                    >Submit Proposal</Button>

                    <Button
                        variant="destructive"
                        size="sm"
                        className="hover:scale-110"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}