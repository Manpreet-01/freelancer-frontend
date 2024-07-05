import { timeSince } from "@/lib/timeFormatter";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, Tags, Timer, TimerReset, Wallet } from "lucide-react";
import type { JobItem } from "@/types/job.types";
import { userData } from "@/types/user.types";
import { ClientJobActions, FreelancerJobActions } from "./JobActions";
import { MouseEvent } from "react";


type JobCardProps = {
    job: JobItem,
    user: userData | null,
    goToJobPage: any,
    onEdit: (jobId: string) => void,
    onDelete: (jobId: string) => void,
};

export default function JobCard({ job, goToJobPage, user, onEdit, onDelete }: JobCardProps) {
    function handleJobEdit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        onEdit(job._id);
    }

    function handleJobDelete(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        onDelete(job._id);
    }

    return (
        <Card className="p-2 hover:border-white cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center" onClick={() => goToJobPage(job._id)}>
            <div className="flex flex-col gap-y-2 justify-between items-start w-full">
                <CardHeader className="flex gap-y-4">
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.description}</CardDescription>
                </CardHeader>

                <CardContent className="sm:hidden flex flex-col gap-y-2">
                    <div className="flex items-center">
                        <Wallet className="mr-1" />
                        <div className="flex items-center">
                            <DollarSign className="w-5 h-5" /><span>5.00</span>
                        </div>
                        <span className="mx-2">-</span>
                        <div className="flex items-center">
                            <DollarSign className="w-5 h-5" /><span>8.00</span>
                        </div>
                    </div>
                    <div className="flex gap-x-2">
                        <Timer className="mr-1" />
                        <span>Hourly</span>
                    </div>

                    <div className="flex gap-x-2">
                        <TimerReset className="mr-1" />
                        <div>{timeSince(job.createdAt)}</div>
                    </div>
                </CardContent>

                <CardFooter className="flex items-start flex-col w-full">
                    <div className="flex flex-wrap gap-2">
                        <Tags className="mr-2" />
                        {job.categories.map(category => (
                            <Badge key={category}>{category}</Badge>
                        ))}

                        {job.tags.map(tag => (
                            <Badge variant="outline" key={tag}>{tag}</Badge>
                        ))}
                    </div>

                    <div className="flex sm:hidden justify-end gap-x-4 mt-4 w-full">
                        {user?.role === 'freelancer' &&
                            <FreelancerJobActions user={user} job={job} />
                        }
                        {user?.role === 'client' &&
                            <ClientJobActions
                                onEdit={handleJobEdit}
                                onDelete={handleJobDelete}
                            />
                        }
                    </div>
                </CardFooter>
            </div>
            <CardContent className="hidden sm:flex flex-col gap-y-2 p-6">
                <div className="flex items-center">
                    <Wallet className="mr-1" />
                    <div className="flex items-center">
                        <DollarSign className="w-5 h-5" /><span>5.00</span>
                    </div>
                    <span className="mx-2">-</span>
                    <div className="flex items-center">
                        <DollarSign className="w-5 h-5" /><span>8.00</span>
                    </div>
                </div>
                <div className="flex gap-x-2">
                    <Timer className="mr-1" />
                    <span>Hourly</span>
                </div>
                <div className="flex gap-x-2">
                    <TimerReset className="mr-1" />
                    <div>{timeSince(job.createdAt)}</div>
                </div>

                <div className="flex gap-x-4 mt-4">
                    {user?.role === 'freelancer' &&
                        <FreelancerJobActions user={user} job={job} />
                    }
                    {user?.role === 'client' &&
                        <ClientJobActions
                            onEdit={handleJobEdit}
                            onDelete={handleJobDelete}
                        />
                    }
                </div>
            </CardContent>
        </Card>
    );
}

