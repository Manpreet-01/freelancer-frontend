import { AlertTriangle } from "lucide-react";

export const CancelledLabel = () => (
    <div className="text-yellow-500 w-full flex justify-center items-center gap-x-4 pt-4 font-bold">
        <AlertTriangle size={20} />
        <span>This Job is Cancelled</span>
    </div>
);