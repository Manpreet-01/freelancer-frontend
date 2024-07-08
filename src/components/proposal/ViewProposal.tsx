import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { LinkIcon, TimerReset, Undo, User } from "lucide-react";
import { timeSince } from "@/lib/timeFormatter";
import { Link } from '@tanstack/react-router';

import type { Proposal } from "@/types/job.types";
import type { JobPageProps } from "../job/JobPage";


type ViewProposalProps = {
    proposal: Proposal,
    onEdit?: JobPageProps["onEditProposal"],
    onWithdraw?: JobPageProps["onWithdrawProposal"],
    setStatus?: JobPageProps["setProposalStatus"],
    role: string,
};

export function ViewProposal({ proposal, onEdit, onWithdraw, setStatus, role }: ViewProposalProps) {
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
                    {role === 'client' && (
                        <>
                            {proposal.status === 'accepted' &&
                                <Button variant="ghost" className="text-green-500 font-bold" disabled>Accepted</Button>
                            }

                            {proposal.status === 'rejected' &&
                                <Button variant="ghost" className="text-red-500 font-bold" disabled>
                                    Rejected
                                </Button>
                            }

                            {proposal.status !== 'accepted' && proposal.status !== 'rejected' ? (
                                <>
                                    <Button
                                        className="hover:scale-105 bg-green-600 hover:bg-green-500 text-gray-50"
                                        onClick={() => setStatus({ proposalId: proposal._id, status: 'accepted' })}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        className="hover:scale-105 bg-red-600 hover:bg-red-500 text-white"
                                        onClick={() => setStatus({ proposalId: proposal._id, status: 'rejected' })}
                                    >
                                        Reject
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    title={`reset ${proposal.status}`}
                                    variant="ghost"
                                    onClick={() => setStatus({ proposalId: proposal._id, status: 'reset' })}
                                >
                                    <Undo />
                                </Button>
                            )}
                        </>
                    )}
                </CardFooter>
            </Card >
        </>
    );
}