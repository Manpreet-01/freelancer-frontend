import { timeSince } from "@/lib/timeFormatter";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, Tags, Timer, TimerReset, Users2, Wallet } from "lucide-react";
import type { JobItem } from "@/types/job.types";
import { ClientJobActions, FreelancerJobActions } from "./JobActions";
import { MouseEvent } from "react";
import { useNavigate } from '@tanstack/react-router';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


export default function JobCard({ job }: { job: JobItem; }) {
    const user = useSelector((state: RootState) => state.user.userData);
    const navigate = useNavigate();

    function handleGoToJobPage(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        navigate({ to: `/job/${job._id}` });
    }

    return (
        <Card onClick={handleGoToJobPage} className="p-2 hover:border-white cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center">
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

                    {job.proposalsCount !== undefined &&
                        <div className="flex gap-x-2" title={`Proposals ${job.proposalsCount}`}>
                            <Users2 /> {job.proposalsCount}
                        </div>
                    }
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
                        {user?.role === 'freelancer' && <FreelancerJobActions job={job} />}
                        {user?.role === 'client' && <ClientJobActions jobId={job._id} />}
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

                {job.proposalsCount !== undefined &&
                    <div className="flex gap-x-2" title={`Proposals ${job.proposalsCount}`}>
                        <Users2 /> {job.proposalsCount}
                    </div>
                }

                <div className="flex gap-x-4 mt-4">
                    {user?.role === 'freelancer' && <FreelancerJobActions job={job} />}
                    {user?.role === 'client' && <ClientJobActions jobId={job._id} />}
                </div>
            </CardContent>
        </Card>
    );
}

