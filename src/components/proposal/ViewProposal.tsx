import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { LinkIcon, TimerReset, User } from "lucide-react";
import { timeSince } from "@/lib/timeFormatter";
import { Link } from '@tanstack/react-router';

import type { Proposal } from "@/types/job.types";
import type { JobPageProps } from "../job/JobPage";


type ViewProposalProps = {
    proposal: Proposal,
    onEdit?: JobPageProps["onEditProposal"],
    onWithdraw?: JobPageProps["onWithdrawProposal"],
    role: string,
};

export function ViewProposal({ proposal, onEdit, onWithdraw, role }: ViewProposalProps) {
    return (
        <>
            <Card className='m-4 p-2'>
                <CardHeader>
                    {role === 'freelancer' && <CardTitle>Cover Letter</CardTitle>}
                    <CardDescription>{proposal.coverLetter}</CardDescription>
                </CardHeader>

                <CardContent className="p-4">
                    <div className="flex flex-col gap-y-2">
                        {role === 'client' && proposal.user && <>
                            <div className="flex gap-x-2 items-center">
                                <User />
                                <span>{proposal.user.name}</span>
                            </div>
                            <div className="flex items-center">
                                <LinkIcon />
                                <Button variant="link" className="pl-2 text-blue-500 hover:scale-110 hover:text-blue-400 underline decoration-dotted hover:decoration-solid">
                                    <Link
                                        to="/profile/$username"
                                        target="_blank"
                                        params={{ username: proposal.user.username }}
                                        className="flex items-center"
                                    >
                                        <span>@{proposal.user.username}</span>
                                    </Link>
                                </Button>
                            </div>
                        </>}
                        <div className="flex gap-x-2" title="CreatedAt">
                            <TimerReset size={20} />
                            <span>Created: </span>
                            <span className="text-gray-500">{timeSince(proposal.createdAt)}</span>
                        </div>
                        <div className="flex gap-x-2" title="UpdatedAt">
                            <TimerReset size={20} />
                            <span>Updated: </span>
                            <span className="text-gray-500">{timeSince(proposal.updatedAt)}</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-x-4 py-4 w-full">
                    {role === 'freelancer' && (
                        <>
                            <Button
                                size="sm"
                                className="hover:scale-110"
                                onClick={onEdit}
                            >Edit Proposal</Button>

                            <Button
                                variant="destructive"
                                size="sm"
                                className="hover:scale-110"
                                onClick={onWithdraw}
                            >
                                Withraw Proposal
                            </Button>
                        </>
                    )}
                </CardFooter>
            </Card>
        </>
    );
}