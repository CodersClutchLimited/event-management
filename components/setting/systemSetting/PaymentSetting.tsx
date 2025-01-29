"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SystemSettingsTypes } from "@/lib/types";
import { Loader } from "lucide-react";
import { SystemSettingHook } from "@/hooks/SystemSettingHook";

const PaymentSettingsSchema = z.object({
  paymentSettings: z.object({
    supportedCurrencies: z.string().min(1, "At least one currency is required"),
    paymentGateway: z.object({
      provider: z.enum(["Stripe", "PayPal", "None"]),
      apiKey: z.string().optional(),
    }),
    enablePaidEvents: z.boolean(),
  }),
});

const PaymentSettings = ({ data }: { data: SystemSettingsTypes }) => {
  const { isPending, handleUpdateSystemSettings } = SystemSettingHook();

  const form = useForm({
    resolver: zodResolver(PaymentSettingsSchema),
    defaultValues: {
      paymentSettings: {
        enablePaidEvents: data?.paymentSettings.enablePaidEvents,
        supportedCurrencies: data?.paymentSettings.supportedCurrencies,
        paymentGateway: { ...data?.paymentSettings.paymentGateway },
      },
    },
  });

  function onSubmit() {
    handleUpdateSystemSettings(form.getValues());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="paymentSettings.enablePaidEvents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enable Paid Events</FormLabel>
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

        <FormField
          control={form.control}
          name="paymentSettings.supportedCurrencies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supported Currencies</FormLabel>
              <FormControl>
                <Input placeholder="e.g. USD, EUR" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentSettings.paymentGateway.provider"
          render={({ field }) => (
            <FormItem {...field}>
              <FormLabel>Payment Gateway Provider</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Payment Methods</SelectLabel>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="Stripe">Stripe</SelectItem>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("paymentSettings.paymentGateway.provider") !== "None" && (
          <FormField
            control={form.control}
            name="paymentSettings.paymentGateway.apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API Key</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter API Key" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
          {isPending && <Loader className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentSettings;
