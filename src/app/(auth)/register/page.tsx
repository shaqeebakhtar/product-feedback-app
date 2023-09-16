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
import { useMutation, useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(4, {
    message: "Username must be atleat 4 characters",
  }),
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email",
  }),
  password: z.string({ required_error: "Password is required" }).min(8, {
    message: "Password must be atleat 8 characters",
  }),
});

const USERNAME_EXISTS = gql`
  query UsernameExists($username: String!) {
    username(username: $username) {
      userId
    }
  }
`;

const REGISTER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

const graphQLClient = new GraphQLClient("/api/graphql");

const Register = () => {
  const [username, setUsername] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const {
    data: usernameQuery,
    isLoading,
    refetch: usernameRefetch,
  }: any = useQuery({
    queryKey: ["username", username],
    queryFn: async () =>
      await graphQLClient.request(USERNAME_EXISTS, { username }),
    enabled: false,
    refetchOnMount: false,
  });

  const checkUsername = async () => {
    if (username) usernameRefetch();

    if (!isLoading && usernameQuery?.username) {
      form.setError("username", {
        type: "custom",
        message: "Username already in use",
      });
    }
  };

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: z.infer<typeof formSchema>) =>
      await graphQLClient.request(REGISTER, {
        username: data.username,
        email: data.email,
        password: data.password,
      }),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.username) usernameRefetch();

    registerMutation.mutate({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (Object.keys(form.formState.errors).length == 0) console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 rounded-md border max-w-[30rem] w-full mx-4 bg-card shadow-sm">
        <div className="flex flex-col space-y-1 mb-6">
          <h3 className="font-semibold tracking-tight text-2xl">
            Create an account
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setUsername(e.target.value);
                      }}
                      onBlur={() => checkUsername()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="email"
              control={form.control}
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
              control={form.control}
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
              Register
            </Button>
          </form>
        </Form>
        <div className="mt-2 text-right">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
