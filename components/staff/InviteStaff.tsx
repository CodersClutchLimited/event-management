"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { fetchRolesServerAction } from "@/lib/actions/role/roleServerAction";
import { SendInvitationLink } from "@/lib/mail";
import { SendInvitation } from "@/lib/actions/staff/staffServerAction";
import { UserHook } from "@/hooks/UserHook";
import { Loader } from "lucide-react";
import { RoleTypes, UserRole } from "@/lib/types";
const formSchema = z.object({
  email: z.string().email(),
  role: z
    .string()
    .min(24, { message: "role selected must be at least 24 characters" }),
});
const InviteStaff = () => {
  const [roles, setRoles] = useState<RoleTypes | any>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<boolean>()
    const [error, setError] = useState<string | null>(null);
    const {isLoading, sendStaffInviteEmail} =UserHook()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),  
    defaultValues: {
      email: "",
      role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const FormValues = form.getValues();

   const response = await sendStaffInviteEmail(FormValues)
   if(response?.status !== 200) {
    setOpen(true)
    return
   }
   setOpen(false)

  }

  useEffect(() => {
    const fetchRoles = async  () => {
      setLoading(true);
      try {
        const response = await fetchRolesServerAction()
        if (response.status !== 200) {
          setError(response.message)
          setLoading(false);
        }
const data  = response.data as unknown as RoleTypes
        setRoles(data);
      } catch  {
        setError("Failed to fetch roles");
      } finally {
        setLoading(false);
        setError(null);
      }
    }
    fetchRoles();

  } , [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Invite User</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Invite a Staff Member to Your Workspace</DialogTitle>
          <DialogDescription>
            We will send an invitation to the specified email address. Please
            make sure to check your spam folder for any confirmation emails.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Staff Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                            {
                            roles?.map((role: any) => (
                              <SelectItem key={role._id} value={role._id}>
                              {role.name}
                              </SelectItem>
                            )) || <SelectItem value="loading" disabled>Loading...</SelectItem>
                            }
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {
                isLoading
                 ? "Sending Invitation..."
                  : "Send Invitation"

              }
              {
                isLoading && <Loader className="animate-spin"/> 
              }
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};


export default InviteStaff;
