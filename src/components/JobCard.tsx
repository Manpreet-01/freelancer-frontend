import { timeSince } from "@/lib/timeFormatter";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, Tags, Timer, TimerReset, Wallet } from "lucide-react";

import type { JobItem } from "@/types/job.types";


export default function JobCard({ job, goToJobPage }: { job: JobItem, goToJobPage: any; }) {

    return (
        <Card className="p-2 hover:border-white cursor-pointer flex justify-between items-center" onClick={() => goToJobPage(job._id)}>
            <div className="flex flex-col gap-y-2 justify-between items-start">
                <CardHeader className="flex gap-y-4">
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.description}</CardDescription>
                </CardHeader>

                <CardFooter className="flex flex-wrap gap-x-2">
                    <Tags className="mr-2" />
                    {job.categories.map(category => (
                        <Badge key={category}>{category}</Badge>
                    ))}

                    {job.tags.map(tag => (
                        <Badge variant="outline" key={tag}>{tag}</Badge>
                    ))}
                </CardFooter>
            </div>
            <CardContent className="flex flex-col gap-y-2">
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
        </Card>
    );
}
