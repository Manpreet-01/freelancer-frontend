import JobPage from '@/components/JobPage';
import { getJobsById } from '@/lib/apiClient';
import type { JobItem } from '@/types/job.types';
import { createLazyFileRoute } from '@tanstack/react-router';


type Params = {
  _id: string;
};



export const Route = createLazyFileRoute('/(jobs)/job/$_id')({
  loader: async ({ params: { _id } }: { params: Params; }) => {
    try {
      const res = await getJobsById(_id);
      return res.data.data.job;
    }
    catch (error) {
      console.error("error in fetch job with id");
      console.error(error);
      return null;
    }
  },
  component: JobPageLayout,
});


function JobPageLayout() {
  const job = Route.useLoaderData<JobItem>();

  console.log("test ", job);

  return <JobPage job={job} goToJobPage={() => null} />;
}