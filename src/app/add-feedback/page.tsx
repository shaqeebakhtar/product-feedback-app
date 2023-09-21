"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { graphQLClient } from "@/lib/graphql-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const createFeedbackSchema = z.object({
  title: z.string({ required_error: "Title cannot be empty" }),
  category: z.enum(["ui", "ux", "bug", "feature", "enhancement"], {
    required_error: "Choose a Category",
  }),
  details: z.string({ required_error: "Details cannot be empty" }),
});

const ADD_FEEDBACK = gql`
  mutation Mutation($title: String!, $tag: String!, $details: String!) {
    addFeedback(title: $title, tag: $tag, details: $details) {
      id
      title
      tag
      details
    }
  }
`;

const CreateFeedback = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof createFeedbackSchema>>({
    resolver: zodResolver(createFeedbackSchema),
  });

  const addFeedbackMutation = useMutation({
    mutationKey: ["addFeedback"],
    mutationFn: async (data: z.infer<typeof createFeedbackSchema>) => {
      return await graphQLClient.request(ADD_FEEDBACK, {
        title: data.title,
        tag: data.category,
        details: data.details,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof createFeedbackSchema>) => {
    addFeedbackMutation.mutate({
      title: data.title,
      category: data.category,
      details: data.details,
    });

    if (!addFeedbackMutation.isLoading && addFeedbackMutation?.data.addFeedback)
      router.push("/feedbacks");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-y-8 mx-4">
        <Link
          href="/"
          className="bg-transparent hover:bg-blue-100 font-bold flex items-center gap-2 px-4 py-2 rounded-md w-max"
        >
          <ChevronLeft size={16} strokeWidth={3} className="text-blue-500" />
          <span className="text-slate-600 text-sm">Go Back</span>
        </Link>
        <div className="p-8 rounded-md border max-w-[30rem] w-full bg-card shadow-sm">
          <div className="flex flex-col space-y-1 mb-6">
            <h3 className="font-bold tracking-tight text-2xl">
              Create New Feedback
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to login into your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Feedback Title</FormLabel>
                    <FormDescription>
                      Add a short, descriptive headline
                    </FormDescription>
                    <FormControl>
                      <Input type="text" placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Category</FormLabel>
                    <FormDescription>
                      Choose a category for your feedback
                    </FormDescription>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ui">UI</SelectItem>
                          <SelectItem value="ux">UX</SelectItem>
                          <SelectItem value="bug">Bug</SelectItem>
                          <SelectItem value="feature">Feature</SelectItem>
                          <SelectItem value="enhancement">
                            Enhancement
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                name="details"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Feedback Detail</FormLabel>
                    <FormDescription>
                      Include any specific comments on what should be improved,
                      added, etc.
                    </FormDescription>
                    <FormControl>
                      <Textarea placeholder="Details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className="flex gap-3 justify-end">
                <Button
                  type="reset"
                  className="bg-slate-800"
                  onClick={() => router.push("/feedbacks")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={addFeedbackMutation.isLoading}
                >
                  Add Feedback
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedback;
