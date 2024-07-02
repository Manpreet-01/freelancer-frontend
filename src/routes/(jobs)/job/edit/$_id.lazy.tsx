import { createJob, updateJob, getJobsById } from '@/lib/apiClient';
import type { JobItem } from '@/types/job.types';
import { createLazyFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import { toast } from '@/components/ui/use-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { createJobSchema } from '../post/index.lazy';
import { Textarea } from '@/components/ui/textarea';

type Params = {
  _id: string;
};

// TODO: add validation ::: allowed for client only page
export const Route = createLazyFileRoute('/(jobs)/job/edit/$_id')({
  // @ts-ignore
  loader: async ({ params: { _id } }: { params: Params; }) => {
    try {
      const res = await getJobsById(_id);
      const job = res.data.data.job;
      if (!job) {

        toast({
          title: 'Job not found.',
          description: "Unable to find the Job",
          variant: 'destructive'
        });

        throw redirect({
          to: '/jobs',
        });
      }

      return job;
    }
    catch (error: any) {
      console.error("error in fetch job with id");
      console.error(error);

      if (error.isRedirect && error.to === '/jobs') {
        throw error;
      }

      return null;
    }
  },
  component: EditJobPage,
});



export const updateJobSchema = createJobSchema.extend({
  jobId: z.string({
    required_error: "JobId is required",
    invalid_type_error: "JobId must be a string",
  })
});

function EditJobPage() {
  const user = useSelector((state: RootState) => state.user.userData);
  const job = Route.useLoaderData<JobItem | null>();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof updateJobSchema>>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      userId: user?._id || '',
      jobId: job?._id || '',
      title: job?.title || '',
      description: job?.description || '',
    }
  });

  async function onSubmit(formData: z.infer<typeof updateJobSchema>) {
    try {
      console.log("xxx ", formData);

      const res = await updateJob(formData);
      console.log('res --- ', res);

      toast({
        title: "Success!",
        description: res.data.message || "Job Updated successfully",
        variant: 'success'
      });

      navigate({ to: `/job/${job?._id}` });
    }
    catch (err) {
      console.error("---> error in updating job ");
      console.error(err);

      toast({
        title: "Failed to Update Job!",
        // @ts-ignore
        description: err.response?.data?.message || err.response?.message || err.message || "Failed to Update job.",
        variant: 'destructive'
      });
    }
  }

  return (
    <>
      <div className='m-4'>
        <Card className="mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Edit Job</CardTitle>
            <CardDescription>
              Enter the job details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title" {...field} />
                          </FormControl>
                          {/* <FormDescription>
                                                Enter your title here.
                                            </FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            {/* <Input placeholder="Description" {...field} /> */}
                            <Textarea placeholder="Type Job Description here." {...field} />
                          </FormControl>
                          {/* <FormDescription>
                                                Enter your description here.
                                            </FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}