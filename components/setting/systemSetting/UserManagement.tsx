"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SystemSettingHook } from "@/hooks/SystemSettingHook";
import { Loader } from "lucide-react";
import { SystemSettingsTypes } from "@/lib/types";

const UserManagementSchema = z.object({
  allowUserRegistration: z.boolean(),
});

const UserManagement = ({ data }: { data: SystemSettingsTypes }) => {
  const { isPending, handleUpdateSystemSettings } = SystemSettingHook();

  const form = useForm({
    resolver: zodResolver(UserManagementSchema),
    defaultValues: {
      allowUserRegistration: data?.eventManagement.allowWaitlist,
      // maxFailedLogins: 5,
    },
  });

  function onSubmit() {
    handleUpdateSystemSettings(form.getValues());
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage user registration and security settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="allowUserRegistration"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Allow User Registration</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
              {isPending && <Loader className="animate-spin" />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
