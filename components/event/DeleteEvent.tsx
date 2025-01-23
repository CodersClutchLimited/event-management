"use client";
import React from "react";
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
import { Loader, Trash, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { EventHook } from "@/hooks/EventHook";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteEventSchemaMessage } from "@/lib/validation/eventValidation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { EventInterfaceType } from "@/lib/types";

const DeleteEvent = ({ event }: { event: EventInterfaceType }) => {
  const { handleDeleteEvent, isLoading } = EventHook();
  const [open, setOpen] = React.useState<boolean>(false);

  const submitDelete = async () => {
    // check if the event have any participant
    if (event.registeredUsers.length > 0) {
      toast.info(
        `Since this event has ${event.registeredUsers.length} participants, they will be notified about the cancellation. `
      );
    }
    const status = await handleDeleteEvent(event._id);
    if (status?.status === 200) {
      setOpen(false);
    }
  };

  const form = useForm({
    resolver: zodResolver(deleteEventSchemaMessage),
    defaultValues: {
      reason: "",
    },
  });

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            type="button"
            className="w-full flex justify-between"
          >
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
                    Delete Event
                  </span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <p className="mb-2">
                    Are you sure you want to delete{" "}
                    <span className="font-bold">{event?.title}</span>?
                    <br />
                    This action will permanently remove this event with the it
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
                    <FormLabel>Reasone </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter event title" {...field} />
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
                <AlertDialogCancel>Cancell</AlertDialogCancel>
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

export default DeleteEvent;
