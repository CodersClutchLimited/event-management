"use client";
import React, { useEffect, useState } from "react";
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
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader } from "lucide-react";
import { UserHook } from "@/hooks/UserHook";
import { useSession } from "next-auth/react";
import { GetSingleUserData } from "@/lib/actions/user/getAllUser";
import { IUser } from "@/lib/types";

const UserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  initial: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().optional(),
  avatar: z.any().optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
  }),
});

const Profile = () => {

  

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const {isLoading, handleUpdateUser} = UserHook()
  const {data:session} = useSession({required: true})
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: "",
      initial: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      avatar: null,
      address: {
        street: "",
        city: "",
        country: "",
      },
    },
  });

 async function onSubmit() {
  const id = session?.user._id
  const fromdata = form.getValues() 
   await handleUpdateUser(id as string, fromdata as unknown as IUser);

  }

  // useffect to grab single user info
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetSingleUserData(session?.user._id as string);
      if (response.status === 200) {
        const data = await response.data
        form.setValue("firstName", data?.firstName);
        form.setValue("initial", data?.initial);
        form.setValue("lastName", data?.lastName);
        form.setValue("email", data?.email);
        form.setValue("phoneNumber", data?.phoneNumber);
        form.setValue("avatar", data?.avatar);
        form.setValue("address", {
          street: data?.address.street,
          city: data?.address.city,
          country: data?.address.country,
        });
      }
    };
    fetchData();
  }, []);

  function handleAvatarChange(file: File | null) {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Update your personal information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
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
                    <Input placeholder="Enter your last name" {...field} />
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
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file);
                        handleAvatarChange(file);
                      }}
                    />
                  </FormControl>
                  {avatarPreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Avatar Preview:</p>
                      <Image
                        width={100}
                        height={100}
                        src={avatarPreview}
                        alt="Profile Avatar Preview"
                        className="h-24 w-24 rounded-full"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {isLoading && <Loader className="inline-block ml-2" size={16} />}
              &nbsp;
              {isLoading? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Profile;
