"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { SystemSettingsTypes } from "@/lib/types";
import { SystemSettingHook } from "@/hooks/SystemSettingHook";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";

const NotificationSchema = z.object({
  notifications: z.object({
    enableEmailNotifications: z.boolean(),
    enableSMSNotifications: z.boolean(),
    enableAppNotifications: z.boolean(),
    eventReminderSchedule: z.coerce
      .number()
      .min(1, "Must be at least 1 hour")
      .max(168, "Must be less than 168 hours"),
  }),
});

const Notifications = ({ data }: { data: SystemSettingsTypes }) => {
  const { isPending, handleUpdateSystemSettings } = SystemSettingHook();

  const form = useForm({
    resolver: zodResolver(NotificationSchema),
    defaultValues: {
      notifications: {
        enableEmailNotifications: data?.notifications?.enableAppNotifications,
        enableSMSNotifications: data?.notifications?.enableSMSNotifications,
        enableAppNotifications: data?.notifications?.enableAppNotifications,
        eventReminderSchedule: data?.notifications?.eventReminderSchedule,
      },
    },
  });

  console.log("testing values", form.getValues());

  function onSubmit() {
    //  add setting id to the data
    const updatedSettings = {
      ...form.getValues(),
      id: data._id,
      eventReminderSchedule: Number(data?.notifications.eventReminderSchedule),
    };

    handleUpdateSystemSettings(updatedSettings);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage your notification preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="notifications.enableEmailNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Email Notifications</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notifications.enableSMSNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>SMS Notifications</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notifications.enableAppNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>App Notifications</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notifications.eventReminderSchedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Reminder (Hours before event)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="input"
                      min={1}
                      max={168}
                      {...field}
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

export default Notifications;
