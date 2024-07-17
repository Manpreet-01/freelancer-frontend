import { Heart, Loader2 } from "lucide-react";
import type { JobItem } from "@/types/job.types";
import { useState, MouseEvent } from "react";
import { toggleJobIsSaved } from "@/lib/apiClient";
import { toast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import { getApiErrMsg } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsSaved } from "@/features/job/jobSlice";
import { RootState } from "@/store/store";

type HeartButtonProps = {
    job: JobItem,
    className: string,
    size?: "default" | "sm" | "lg" | "icon" | null | undefined,
};

export function HeartButton({ job, className, size }: HeartButtonProps) {
    const userId = useSelector((state: RootState) => state.user.userData?._id)!;
    const [isSaved, setIsSaved] = useState(job.isSaved);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

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
                dispatch(toggleIsSaved({ isSaved: updatedStatus, jobId: job._id }));
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
        <Button size={size} className={className} variant="outline" disabled={isLoading} onClick={handleIsSavedToggle} >
            {isLoading ? <Loader2 className="animate-spin" /> :
                <Heart
                    className={`${isSaved ? "text-red-700 fill-red-600" : ""} `}
                />
            }
        </Button >
    );
}