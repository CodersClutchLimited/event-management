"use client"
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader, Trash, TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";
import { IUser } from "@/lib/types";
import { deleteUserSchemaMessage } from "@/lib/validation/userValidation";
import { Textarea } from "../ui/textarea";
import { UserHook } from "@/hooks/UserHook";

const DeleteUser = ({user}: {user: IUser}) => {
    const { HandleDeleteUser, isLoading } = UserHook();
    const [open, setOpen] = React.useState<boolean>(false);
  


    const submitDelete = async () => {
      const status = await HandleDeleteUser(user._id);
      if (status?.status === 200) {
        setOpen(false);
      }
    };
  
      const form = useForm({
        resolver: zodResolver(deleteUserSchemaMessage),
        defaultValues: {
          reason: "",
        },
      });
    
  

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full flex justify-between">
            Delete <Trash className="text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitDelete)}>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <span className="text-destructive">
                    <TriangleAlert
                      className="mr-1 inline-block stroke-destructive"
                      size={18}
                    />{" "}
                    Delete user
                  </span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <p className="mb-2">
                    Are you sure you want to delete{" "}
                    <span className="font-bold">{user?.firstName}</span>?
                    <br />
                    This action will permanently remove this user with the it
                    realated data
                    {/* <span className="font-bold">
                {currentRow.role.toUpperCase()}
              </span>{" "} */}
                    from the system. This cannot be undone.
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Why do you want to delete this user?" {...field} />
                    </FormControl>

                    <FormMessage />
                    <FormDescription>
                      Reason must be at least 10 characters long
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Alert variant="destructive">
                <AlertTitle>Warning!</AlertTitle>
                <AlertDescription>
                  Please be cautious, as this operation cannot be undone.
                  Registered users will be notified about the reason for the
                  event cancellation.
                </AlertDescription>
              </Alert>

              <AlertDialogFooter className="mt-3">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button disabled={isLoading} type="submit">
                  {isLoading ? "Deleting..." : "Delete"}
                  {isLoading ? <Loader className=" animate-spin " /> : null}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteUser;
