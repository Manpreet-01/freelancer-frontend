import { Button } from "../ui/button";
import { MouseEventHandler } from "react";


export const ApplyJob = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement>; }) => (
    <Button
        key='active'
        size="sm"
        className="hover:scale-110"
        onClick={onClick}
    >
        Apply Job
    </Button>
);

export const Applied = () => (
    <Button
        key='disabled'
        disabled={true}
        variant="ghost"
        className='text-green-500 hover:text-green-500 hover:bg-card font-bold'
        style={{ pointerEvents: "all" }}
    >
        Applied
    </Button>
);


export const Withdrawn = () => (
    <Button
        key='disabled'
        disabled={true}
        variant="ghost"
        className='text-yellow-500 hover:text-yellow-500 hover:bg-card font-bold'
        style={{ pointerEvents: "all" }}
    >
        Withdrawn
    </Button>
);

export const Accepted = () => (
    <Button
        key='accepted'
        disabled={true}
        variant="ghost"
        title='Your proposal accepted by client'
        className='text-green-500 hover:text-green-500 hover:bg-card font-bold'
        style={{ pointerEvents: "all" }}
    >
        Accepted
    </Button>
);


export const Rejected = () => (
    <Button
        key='rejected'
        disabled={true}
        variant="ghost"
        title='Your proposal rejected by client'
        className='text-red-500 hover:text-red-500 hover:bg-card font-bold'
        style={{ pointerEvents: "all" }}
    >
        Rejected
    </Button>
);