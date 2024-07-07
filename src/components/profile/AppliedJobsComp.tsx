import { JobItem } from "@/types/job.types";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";


// NOT USED
export function AppliedJobsComp({ appliedJobs: job }: { appliedJobs: JobItem }) {

  return (
    <div>
      <h2 className='text-2xl'>Applied Jobs</h2>

      <Card>
        <CardHeader>
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>{job.description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
