import { JobItem } from "@/types/job.types";
import { ViewProposal } from "./ViewProposal";
import { UserData } from "@/types/user.types";
import { Card } from "../ui/card";



type ProposalsList = {
    job: JobItem,
    user: UserData,
    setProposalStatus: any,
};

export function ProposalsList({ job, user, setProposalStatus }: ProposalsList) {
    return (
        <>
            <Card className="m-4">
                <h1 className="text-3xl m-8">All Proposals</h1>
                {job.proposals?.length == 0 &&
                    <p className="p-4 mx-4 text-lg">
                        No Proposals here.
                    </p>
                }
                {job.proposals?.map(proposal => (
                    <ViewProposal
                        key={proposal._id}
                        role={user.role}
                        proposal={proposal}
                        setStatus={setProposalStatus}
                    />
                ))}
            </Card>
        </>
    );
}
