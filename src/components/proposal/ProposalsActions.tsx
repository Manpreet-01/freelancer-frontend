import { Button } from "../ui/button";
import { Undo } from "lucide-react";
import type { ViewProposalProps } from "./ViewProposal";


const ProposalWithdrawnUi = () => <Button variant="ghost" className="text-yellow-500 font-bold" disabled>Proposal Withdrawn</Button>;


type FreelancerActionsProps = {
    isWithdrawn: boolean
    onEdit: ViewProposalProps["onEdit"],
    onWithdraw: ViewProposalProps["onWithdraw"];
};

export const FreelancerActions = ({ onEdit, onWithdraw, isWithdrawn }: FreelancerActionsProps) => {
    return isWithdrawn ? <ProposalWithdrawnUi /> : (
        <>
            <Button size="sm" className="hover:scale-110" onClick={onEdit}>Edit Proposal</Button>
            <Button variant="destructive" size="sm" className="hover:scale-110" onClick={onWithdraw}>Withdraw Proposal</Button>
        </>
    );
};


type ClientActionsProps = {
    proposal: ViewProposalProps["proposal"],
    setStatus: ViewProposalProps["setStatus"];
};

export const ClientActions = ({ proposal, setStatus }: ClientActionsProps) => {
    const { isWithdrawn, status, _id } = proposal;
    return (
        <>
            {!isWithdrawn && status === 'accepted' && <Button variant="ghost" className="text-green-500 font-bold" disabled>Accepted</Button>}
            {!isWithdrawn && status === 'rejected' && <Button variant="ghost" className="text-red-500 font-bold" disabled>Rejected</Button>}
            {isWithdrawn ? (
                <ProposalWithdrawnUi />
            ) : (
                <>
                    {status !== 'accepted' && status !== 'rejected' ? (
                        <>
                            <Button className="hover:scale-105 bg-green-600 hover:bg-green-500 text-gray-50" onClick={() => setStatus({ proposalId: _id, status: 'accepted' })}>Accept</Button>
                            <Button className="hover:scale-105 bg-red-600 hover:bg-red-500 text-white" onClick={() => setStatus({ proposalId: _id, status: 'rejected' })}>Reject</Button>
                        </>
                    ) : (
                        <Button title={`reset ${status}`} variant="ghost" onClick={() => setStatus({ proposalId: _id, status: 'reset' })}>
                            <Undo />
                        </Button>
                    )}
                </>
            )}
        </>
    );
};