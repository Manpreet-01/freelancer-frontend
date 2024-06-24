import { timeSince } from "@/lib/timeFormatter";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { DollarSign } from "lucide-react";

import type { JobItem } from "@/types/job.types";


export default function JobCard({ job }: { job: JobItem; }) {
    function handleClick() {
        // TODO: redirect to a detailed job page and fetch details with job._id
        // console.log('job clicked ', job._id);
    }

    return (
        <Card className="hover:border-white cursor-pointer" onClick={handleClick}>
            <CardHeader>
                <div className="flex justify-between">
                    <div className="space-y-2">
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.description}</CardDescription>
                        <CardDescription>{timeSince(job.createdAt)}</CardDescription>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <DollarSign className="w-5 h-5" /><span>5.00</span>
                            </div>
                            <span className="mx-2">-</span>
                            <div className="flex items-center">
                                <DollarSign className="w-5 h-5" /><span>8.00</span>
                            </div>
                        </div>
                        <span>Hourly</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex flex-wrap gap-x-2">
                    {job.categories.map(category => (
                        <Badge key={category}>{category}</Badge>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="flex flex-wrap gap-x-2">
                {job.tags.map(tag => (
                    <Badge variant="outline" key={tag}>{tag}</Badge>
                ))}
            </CardFooter>
        </Card>
    );
}
