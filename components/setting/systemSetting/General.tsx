"use client";
import React, { useState } from "react";
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
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { UploadButton } from "@/components/ui/upload"; // Example for a custom upload component
import Image from "next/image";
import { SettingGeneral } from "@/lib/validation/setting";
import { SystemSettingsTypes } from "@/lib/types";
import { SystemSettingHook } from "@/hooks/SystemSettingHook";
import { Loader } from "lucide-react";

const General = ({ data }: { data: SystemSettingsTypes }) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { isPending, handleUpdateSystemSettings } = SystemSettingHook();

  const form = useForm({
    resolver: zodResolver(SettingGeneral),
    defaultValues: {
      systemName: {
        systemName: data?.general?.systemName,
        logo: "",
        contactEmail: data?.general?.contactEmail,
        contactPhone: data?.general?.contactPhone,
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

  function handleLogoChange(file: File | null) {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding</CardTitle>
        <CardDescription>
          Customize the branding of your application by setting your brand name
          and logo.{" "}
          <span className="ml-2 text-sm text-gray-500">
            (The logo will appear alongside the brand name across the
            application.)
          </span>
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
              name="systemName.systemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="systemName.contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Contact Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="systemName.contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Contact Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="systemName.logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                        handleLogoChange(file);
                      }}
                    />
                  </FormControl>
                  {logoPreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Logo Preview:</p>
                      <Image
                        width={100}
                        height={100}
                        src={logoPreview}
                        alt="Brand Logo Preview"
                        className="h-24 w-24  rounded-full"
                      />
                    </div>
                  )}
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

export default General;
