import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from "@/components/ui/use-toast";
import axios from 'axios';


export const Route = createLazyFileRoute('/login')({
    component: LoginPage,
});


const FormSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: 'Password is required' }),
});


export function LoginPage() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const navigate = useNavigate();

    async function onSubmit(formData: z.infer<typeof FormSchema>) {
        console.log("submiteed : ", formData);


        // TODO: render error handling messages in ui for better ux
        // form.formState.errors.username
        // form.setError('username', { message: 'username is invalid' });

        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/login", formData);
            const d = res.data;
            console.log("res :: ", d);

            toast({
                title: "Success!",
                description: res.data.message || "Form data submitted successfully",
                variant: 'success'
            });

            navigate({ to: '/profile' });
        }
        catch (err: any) {
            console.error("login err :", err);
            toast({
                title: "Login Failed!",
                description: err.response?.data?.message || err.response?.message || err.message || "Form data submition Failed.",
                variant: 'destructive'
            });
        }
    }

    return (
        <Card className="mx-auto max-w-sm mt-8">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Username" autoComplete='username' {...field} />
                                            </FormControl>
                                            {/* <FormDescription>
                                                Enter your Username here.
                                            </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Password" type='password' autoComplete='current-password' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <Link to="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link> */}
                            </div>
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Submitting..." : "Login"}
                            </Button>
                            {/* <Button variant="outline" className="w-full">
                                Login with Google
                            </Button> */}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="underline">
                                Register here
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}