"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ResetPasswordValidation, setUpAccount } from "@/lib/validation/auth";
import { resetPassword } from "@/lib/actions/auth/reset-password";

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
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof setUpAccount>>({
    resolver: zodResolver(setUpAccount),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof setUpAccount>) {
    // console.log(values)
    const loadingtoastId = toast.loading(
      "🚀 Hold tight! while we send you a reset password link"
    );

    startTransition(() => {
      resetPassword(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
            toast.dismiss(loadingtoastId);
          } else if (data?.success) {
            toast.success(data.error);
            toast.dismiss(loadingtoastId);
          }
        })
        .catch(() => {
          toast.dismiss(loadingtoastId);
          toast.error("Something went wrong");
        });
    });
  }

  return (
    <section className="w-full max-w-sm h-[100vh] flex justify-center items-center m-auto">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Set Up Your Account</CardTitle>
          <CardDescription>
            Enter your information below to set up your staff account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="John"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Smith"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={true}
                          placeholder="Smith"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="*********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="**********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                size="lg"
                className="w-full mt-6"
                s
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Confirm"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResetForm;
