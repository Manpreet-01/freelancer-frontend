import { timeSince } from "@/lib/timeFormatter";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, Tags, Timer, TimerReset, Wallet } from "lucide-react";

import type { JobItem } from "@/types/job.types";


export default function JobPage({ job, goToJobPage }: { job: JobItem, goToJobPage: any; }) {

    return (
        <Card className="m-4 mt-8 p-2" onClick={() => goToJobPage(job._id)}>
            <CardHeader>
                <CardTitle>{job.title}</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-y-2">
                <div className="flex gap-x-2">
                    <Wallet className="mr-1" />
                    <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4" /><span>5.00</span>
                        <span className="mx-2">-</span>
                        <DollarSign className="w-4 h-4" /><span>8.00</span>
                    </div>
                </div>

                <div className="flex gap-x-2">
                    <Timer />
                    <span className="ml-2">Hourly</span>
                </div>

                <div className="flex items-center gap-x-2">
                    <TimerReset className="mr-1" />
                    {timeSince(job.createdAt)}
                </div>

                <CardDescription className="my-4 text-md">{job.description}</CardDescription>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-y-4">
                <div className="flex flex-wrap gap-x-2">
                    <Tags className="mr-2" />
                    {job.categories.map(category => (
                        <Badge key={category}>{category}</Badge>
                    ))}

                    {job.tags.map(tag => (
                        <Badge variant="outline" key={tag}>{tag}</Badge>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}