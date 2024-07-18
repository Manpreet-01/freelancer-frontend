import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

import type { JobPageProps } from "../job/JobPage";
import { MessageSquareWarningIcon } from "lucide-react";

type CreateOrUpdateProposalProps = {
    oldCoverLetter?: string,
    onCancelProposal: JobPageProps["onCancelProposal"],
    onSubmit: JobPageProps["onSubmitProposal"],
};

export function CreateOrUpdateProposal({ onCancelProposal, onSubmit, oldCoverLetter }: CreateOrUpdateProposalProps) {
    const [coverLetter, setCoverLetter] = useState(oldCoverLetter || '');
    const [errMsg, setErrMsg] = useState("");
    const [isIntracted, setIsIntracted] = useState(false);

    useEffect(() => {
        if (coverLetter) setErrMsg("");
        if (!coverLetter && !errMsg && isIntracted) setErrMsg("Cover Letter is required.");
        if (!isIntracted && coverLetter) setIsIntracted(true);
    }, [coverLetter.length]);


    function handleSubmit() {
        if (coverLetter.trim()) return onSubmit(coverLetter);
        setIsIntracted(true);
        setErrMsg("Cover Letter is required.");
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
                    <span className={`flex items-center gap-x-2  pt-4 ${errMsg ? 'visible' : 'invisible'}`}>
                        <MessageSquareWarningIcon className="text-red-500" />
                        <span className='text-xl text-red-500'>{errMsg || "Error placeholder"}</span>
                    </span>

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
                        onClick={onCancelProposal}
                    >
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}