'use client'
import {userSchema} from '@/lib/validation/userValidation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Loader, Save } from "lucide-react"
import { IUser } from '@/lib/types'
import {UserHook} from "@/hooks/UserHook"
import { useSession } from "next-auth/react";
import { useState } from 'react'

const EditUser = ({user} : {user: IUser}) => {

    const { handleUpdateUser, isLoading } = UserHook();
    const [open, setOpen] = useState<boolean>(false);
    const { data: session } = useSession({ required: true });
  

  // Use react-hook-form with Zod validation
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      password: '', // Password is typically not pre-filled for security reasons
      phoneNumber: user?.phoneNumber || '',
      role: user?.role || ''
    },
  });
  
  // Handle form submission
  async function onSubmit() {
    const status = await handleUpdateUser(user._id, form.getValues());
    if (status?.status === 200) {
      setOpen(false);
      form.reset();
    }    
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button
            variant={"outline"}
            className="w-full flex items-center justify-between mt-1"
          >
            Edit <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Edit below and click save to update user info.
              </DialogDescription>
            </DialogHeader>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* First Name Field */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name Field */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              </div>

            {/* Phone Number Field (Optional) */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., +1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role Field */}
                          <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            <DialogFooter>
            <DialogClose type="button">
                <Button variant="outline">Cancel</Button>
            </DialogClose>

              <Button disabled={isLoading} type="submit">
              {isLoading ? "Saving changes..." : "Save changes"}
                {isLoading ? (
                  <Loader className="animate-spin ml-2" />
                ) : (
                  <Save className="ml-2" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
