import { Heart, Loader2 } from "lucide-react";
import type { JobItem } from "@/types/job.types";
import { useState, MouseEvent } from "react";
import { toggleJobIsSaved } from "@/lib/apiClient";
import { toast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import { getApiErrMsg } from "@/lib/utils";

type HeartButtonProps = {
    userId: string,
    job: JobItem,
    className: string;
};

export function HeartButton({ userId, job, className }: HeartButtonProps) {
    const [isSaved, setIsSaved] = useState(job.isSaved);
    const [isLoading, setIsLoading] = useState(false);

    async function handleIsSavedToggle(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();

        const errMsg = isSaved ? "Failed to Save" : "Failed to UnSave";

        try {
            setIsLoading(true);
            const res = await toggleJobIsSaved({ userId, jobId: job._id });
            const updatedStatus = res.data.data.isSaved;

            if (updatedStatus === true || updatedStatus === false) {
                setIsSaved(updatedStatus);
            } else {
                throw new Error(errMsg);
            }
        } catch (err: any) {
            console.error(err);
            toast({
                title: "Error!",
                description: getApiErrMsg(err, errMsg),
                variant: 'destructive'
            });
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Button className={className} variant="outline" disabled={isLoading} onClick={handleIsSavedToggle} >
            {isLoading ? <Loader2 className="animate-spin" /> :
                <Heart
                    className={`${isSaved ? "text-red-700 fill-red-600" : ""} `}
                />
            }
        </Button >
    );
}