import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
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
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export const Route = createLazyFileRoute('/register')({
    component: RegisterPage,
});


const RegisterFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: 'Invalid email address' }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: 'Password is required' }),
    role: z.string().refine(val => z.enum(['freelancer', 'client']).safeParse(val).success, {
        message: 'Invalid role. Valid roles are "freelancer" or "client".',
    })
});


export function RegisterPage() {
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);

    const usernameTimer: { current: any; } = useRef();

    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            name: '',
            email: '',
            username: '',
            password: '',
            role: 'freelancer',
        }
    });

    const navigate = useNavigate();
    
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    useLayoutEffect(() => {
        if (isLoggedIn) {
            navigate({ to: '/profile' });
            return;
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (usernameTimer.current) clearTimeout(usernameTimer.current);
        if (!username) {
            setUsernameMessage('');
            return;
        }

        usernameTimer.current = setTimeout(async () => {
            setIsCheckingUsername(true);
            setUsernameMessage('');

            try {
                const res = await axios.post("http://localhost:8000/api/v1/user/check-username", { username });
                const d = res.data;
                console.log("res :: ", d);

                const msg = res.data.message || "Form data submitted successfully";

                setUsernameMessage(msg);

                // toast({
                //     title: "Success!",
                //     description: msg,
                //     variant: 'success'
                // });

            }
            catch (err: any) {
                console.error("register err :", err);
                const errMsg = err.response?.data?.message || err.response?.message || err.message || "Form data submition Failed.";

                setUsernameMessage(errMsg);

                // toast({
                //     title: "Registeration Failed!",
                //     description: errMsg,
                //     variant: 'destructive'
                // });
            }
            finally {
                setIsCheckingUsername(false);
            }

        }, 1000);
    }, [username]);

    async function onSubmit(formData: z.infer<typeof RegisterFormSchema>) {
        console.log("submiteed : ", formData);


        // TODO: render error handling messages in ui for better ux
        // form.formState.errors.username
        // form.setError('username', { message: 'username is invalid' });

        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/register", formData);
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
            console.error("register err :", err);
            toast({
                title: "Registeration Failed!",
                description: err.response?.data?.message || err.response?.message || err.message || "Form data submition Failed.",
                variant: 'destructive'
            });
        }
    }
    
    if(isLoggedIn) return null;

    return (
        <Card className="mx-auto max-w-sm mt-8">
            <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Name" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Email" />
                                            </FormControl>
                                            {/* <p className='text-muted text-gray-400 text-sm'>We will send you a verification code</p> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <>
                                                    <Input
                                                        {...field}
                                                        onChange={e => {
                                                            field.onChange(e);
                                                            setUsername(e.target.value);
                                                        }}
                                                        placeholder="Username"
                                                    />
                                                    {isCheckingUsername ? <Loader2 className='animate-spin' /> : (
                                                        usernameMessage && (usernameMessage === 'username is unique' ? (
                                                            <p className='text-green-500'>username is unique</p>
                                                        ) : (
                                                            <p className='text-red-500'>This username is not available</p>
                                                        ))
                                                    )}
                                                </>
                                            </FormControl>
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
                                                <Input placeholder="Password" type='password' autoComplete='current-passwords' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <Link to="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link> */}
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="freelancer">Freelancer</SelectItem>
                                                    <SelectItem value="client">Client</SelectItem>
                                                    <SelectItem value="test">test</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={!!(form.formState.isSubmitting || (username && usernameMessage !== 'username is unique'))}>
                                {form.formState.isSubmitting ? "Submitting..." : "Register"}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="underline">
                                Log in
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent >
        </Card >
    );
}