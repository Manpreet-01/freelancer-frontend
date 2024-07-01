import { createLazyFileRoute } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { createJob } from '@/lib/apiClient';
import { toast } from "@/components/ui/use-toast";


// TODO: add validation ::: allowed for client only page
export const Route = createLazyFileRoute('/(jobs)/job/post/')({
  component: PostNewJobPage
});

export const createJobSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  userId: z.string().min(1, { message: "userId is required." }),
});

function PostNewJobPage() {
  const user = useSelector((state: RootState) => state.user.userData);

  const _id = user?._id || "dd";

  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      userId: _id,
      title: '',
      description: '',
    }
  });

  async function onSubmit(formData: z.infer<typeof createJobSchema>) {
    try {
      console.log("xxx ", formData);

      const res = await createJob(formData);
      console.log('res --- ', res);

      toast({
        title: "Success!",
        description: res.data.message || "Job Posted successfully",
        variant: 'success'
      });
    }
    catch (err) {
      console.error("---> error in posting job ");
      console.error(err);

      toast({
        title: "Failed to Post Job!",
        // @ts-ignore
        description: err.response?.data?.message || err.response?.message || err.message || "Failed to post job.",
        variant: 'destructive'
      });
    }
  }

  return (
    <>
      <div className='m-4'>
        <Card className="mx-auto max-w-sm mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Post Job</CardTitle>
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
                            <Input placeholder="Description" {...field} />
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
                    {form.formState.isSubmitting ? "Saving..." : "Post"}
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