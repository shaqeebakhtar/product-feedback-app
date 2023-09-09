"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import * as z from "zod";

const formSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email",
  }),
  password: z.string({ required_error: "Password is required" }),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/feedbacks",
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 rounded-md border max-w-[30rem] w-full mx-4 bg-card shadow-sm">
        <div className="flex flex-col space-y-1 mb-6">
          <h3 className="font-semibold tracking-tight text-2xl">
            Login to your Account
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to login into your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@domain.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-2 text-right">
          <p className="text-sm text-muted-foreground">
            Don{`'`}t have an account?{" "}
            <Link href="/register" className="underline text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
