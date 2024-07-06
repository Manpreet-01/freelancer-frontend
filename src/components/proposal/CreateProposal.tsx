import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from '@/components/ui/textarea';
import { useState } from "react";
import { Button } from "../ui/button";

import type { JobPageProps } from "../job/JobPage";

type CreateProposalProps = {
    onCancel: JobPageProps["onCancelProposal"],
    onSubmit: JobPageProps["onSubmitProposal"],
};

export function CreateProposal({ onCancel, onSubmit }: CreateProposalProps) {
    const [coverLetter, setCoverLetter] = useState('');

    function handleSubmit() {
        onSubmit(coverLetter);
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