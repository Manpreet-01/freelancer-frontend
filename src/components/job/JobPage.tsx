import { timeSince } from "@/lib/timeFormatter";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, Tags, Timer, TimerReset, Wallet } from "lucide-react";
import type { JobItem } from "@/types/job.types";
import { userData } from "@/types/user.types";
import { ClientJobActions, FreelancerJobActions } from "./JobActions";
import { CreateOrUpdateProposal } from "../proposal/CreateOrUpdateProposal";
import { ViewProposal } from "../proposal/ViewProposal";
import { ProposalsList } from "../proposal/ProposalsList";

export type JobPageProps = {
    job: JobItem,
    user: userData | null,
    onDelete: any,
    onEdit: any,
    isApplying: boolean,
    isEditingPropoal: boolean,
    onCancelProposal: any,
    onSubmitProposal: (coverLetter: string) => void,
    onEditProposal: any,
    onWithdrawProposal: any,
    setProposalStatus: any,
};

export default function JobPage({
    job, user, onDelete, onEdit, isApplying, isEditingPropoal,
    onCancelProposal, onSubmitProposal, onEditProposal, onWithdrawProposal,
    setProposalStatus
}: JobPageProps) {

    return (
        <>
            <Card className="m-4 mt-8 p-2">
                <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-y-4">
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

                    <div className="flex items-center gap-x-2">
                        Proposals {job.proposalsCount}
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

            {user?.role === 'freelancer' && !job.isApplied && isApplying &&
                <CreateOrUpdateProposal
                    onCancel={onCancelProposal}
                    onSubmit={onSubmitProposal}
                />
            }

            {user?.role === 'freelancer' && job.isApplied && isEditingPropoal && (
                <CreateOrUpdateProposal
                    oldCoverLetter={job.proposal.coverLetter}
                    onCancel={onCancelProposal}
                    onSubmit={onSubmitProposal}
                />
            )}

            {user?.role === 'freelancer' && job.isApplied && !isEditingPropoal &&
                <ViewProposal
                    proposal={job.proposal}
                    onEdit={onEditProposal}
                    onWithdraw={onWithdrawProposal}
                    role={user.role}
                />
            }

            {user?.role === 'client' && (
                <ProposalsList
                    job={job}
                    user={user}
                    setProposalStatus={setProposalStatus}
                />
            )}
        </>
    );
};
