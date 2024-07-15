import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ClientActions, FreelancerActions } from "./ProposalsActions";

import type { Proposal } from "@/types/job.types";
import type { JobPageProps } from "../job/JobPage";
import { CreatedAt, UserInfo, UserProfileLink } from "./_VIewProposal_misc";


export type ViewProposalProps = {
    proposal: Proposal,
    onEdit?: JobPageProps["onEditProposal"],
    onWithdraw?: JobPageProps["onWithdrawProposal"],
    setStatus?: JobPageProps["setProposalStatus"],
    role: string,
};

export function ViewProposal({ proposal, onEdit, onWithdraw, setStatus, role }: ViewProposalProps) {
    const { withdrawn, coverLetter, user, createdAt } = proposal;

    return (
        <>
            <Card className='m-4 p-2'>
                <CardHeader>
                    {role === 'freelancer' && <CardTitle>Cover Letter</CardTitle>}
                    <CardDescription className="whitespace-pre">{coverLetter}</CardDescription>
                </CardHeader>

                <CardContent className="p-4">
                    <div className="flex flex-col gap-y-2">
                        {role === 'client' && user && (
                            <>
                                <UserInfo user={user} />
                                <UserProfileLink username={user.name} />
                            </>
                        )}
                        <CreatedAt date={createdAt} />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-x-4 py-4 w-full">
                    {role === 'freelancer' &&
                        <FreelancerActions onEdit={onEdit} withdrawn={withdrawn} onWithdraw={onWithdraw} />
                    }

                    {role === 'client' && <ClientActions proposal={proposal} setStatus={setStatus} />}
                </CardFooter>
            </Card >
        </>
    );
}