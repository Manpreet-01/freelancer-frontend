import { updateJob, getJobByid } from '@/lib/apiClient';
import type { JobItem } from '@/types/job.types';
import { createLazyFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import { toast } from '@/components/ui/use-toast';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { createJobSchema } from '../post/index.lazy';
import { Textarea } from '@/components/ui/textarea';
import { getApiErrMsg } from '@/lib/utils';

type Params = {
  _id: string;
};

// TODO: add validation ::: allowed for client only page
export const Route = createLazyFileRoute('/(jobs)/job/edit/$_id')({
  // @ts-ignore
  loader: async ({ params: { _id } }: { params: Params; }) => {
    const user = store.getState().user.userData;

    // user validations
    if (!user) throw redirect({ to: '/login' });

    if (user.role !== 'client') {
      toast({
        title: 'Not Allowed!',
        description: 'Only Cllients can Post the jobs',
        variant: 'destructive'
      });
      throw redirect({ to: '/notfound' });
    }

    try {
      // job validations
      const res = await getJobByid(_id);
      const job = res.data.data.job;
      if (!job) {
        toast({
          title: 'Error',
          description: "Not found, faild to load the job.",
          variant: 'destructive'
        });
        throw redirect({ to: '/notfound' });
      }

      // TODO: add this logic on backend also
      if (user._id !== job.createdBy) {
        toast({
          title: 'Access denied',
          description: "Access not allowed, Unauthorize request",
          variant: 'destructive'
        });
        throw redirect({ to: '/notfound' });
      }

      return job;
    }
    catch (error: any) {
      console.error("error in fetch job with id");
      console.error(error);

      if (typeof error.to == 'string') {
        throw redirect({ to: error.to });
      }
      else {
        toast({
          title: 'Oops! An Error Occured',
          description: getApiErrMsg(error, "Unable to get the Job"),
          variant: 'destructive'
        });
        throw redirect({ to: '/notfound' });
      }

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
  
  const handleCancel = () => navigate({ to: `/job/${job?._id}` });

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
        description: getApiErrMsg(err, "Failed to Update job."),
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

                  <div className="flex gap-4 w-full">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Saving..." : "Save"}
                    </Button>
                    <Button type='button' onClick={handleCancel} variant="destructive">Cancel</Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}