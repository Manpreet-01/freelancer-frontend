import { JobItem } from "@/types/job.types";
import { ViewProposal } from "./ViewProposal";
import { userData } from "@/types/user.types";
import { Card } from "../ui/card";


export function ProposalsList({ job, user }: { job: JobItem, user: userData; }) {
    return (
        <>
            <Card className="m-4">
                <h1 className="text-3xl m-8">All Proposals</h1>
                {job.proposals?.map(proposal => (
                    <ViewProposal
                        key={proposal._id}
                        role={user.role}
                        proposal={proposal}
                    />
                ))}
            </Card>
        </>
    );
}
