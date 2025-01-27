"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import { SystemSettingHook } from "@/hooks/SystemSettingHook";
import { SystemSettingsTypes } from "@/lib/types";

const EventManagementSchema = z.object({
  eventManagement: z.object({
    allowWaitlist: z.boolean().default(true),
  }),
});

const EventManagement = ({ data }: { data: SystemSettingsTypes }) => {
  const { isPending, handleUpdateSystemSettings } = SystemSettingHook();

  const form = useForm({
    resolver: zodResolver(EventManagementSchema),
    defaultValues: {
      eventManagement: {
        allowWaitlist: data?.eventManagement.allowWaitlist,
      },
    },
  });

  function onSubmit() {
    const updatedSettings = {
      ...form.getValues(),
      id: data._id,
    };
    handleUpdateSystemSettings(updatedSettings);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Management</CardTitle>
        <CardDescription>
          Configure settings related to event management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="eventManagement.allowWaitlist"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Allow Waitlist</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
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

export default EventManagement;
