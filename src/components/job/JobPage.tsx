import { timeSince } from "@/lib/timeFormatter";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, Edit, Tags, Timer, TimerReset, Trash2, Wallet } from "lucide-react";
import type { JobItem } from "@/types/job.types";
import { userData } from "@/types/user.types";
import { Button } from "../ui/button";
import { HeartButton } from "./HeartButton";


export default function JobPage({ job, user, onDelete, onClickEdit }: { job: JobItem, user: userData | null, onDelete: any, onClickEdit: any; }) {
    return (
        <Card className="m-4 mt-8 p-2">
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

                <CardDescription className="whitespace-break-spaces my-4 text-md">{job.description}</CardDescription>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-y-4">
                <div className="flex flex-wrap gap-2">
                    {(job.categories.length != 0 || job.tags.length) != 0 && <Tags className="mr-2" />}
                    {job.categories.map(category => (
                        <Badge key={category}>{category}</Badge>
                    ))}

                    {job.tags.map(tag => (
                        <Badge variant="outline" key={tag}>{tag}</Badge>
                    ))}
                </div>

                {user?.role === 'client' &&
                    <div className="flex gap-x-4 pr-4 justify-end w-full">
                        <Edit className="cursor-pointer hover:scale-110" onClick={onClickEdit} />
                        <Trash2 className="text-red-500 cursor-pointer hover:scale-110" onClick={onDelete} />
                    </div>
                }

                {user?.role === 'freelancer' &&
                    <div className="flex gap-x-4 pr-4 justify-end w-full">
                        <Button className="hover:scale-110">
                            Apply Job
                        </Button>

                        <HeartButton userId={user._id} job={job} className="disabled:cursor-not-allowed hover:scale-110" />
                    </div>
                }
            </CardFooter>
        </Card>
    );
};