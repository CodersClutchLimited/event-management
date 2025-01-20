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
import { Trash, TriangleAlert } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const RevomeFromEvent = ({ item }) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={"icon"} variant="outline" className=" rounded-full">
            <Trash className="text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <span className="text-destructive">
                <TriangleAlert
                  className="mr-1 inline-block stroke-destructive"
                  size={18}
                />{" "}
                Remove From Event
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-2">
                Are you sure you want to remover this user from this event{" "}
                <span className="font-bold">{item?.title}</span>?
                <br />
                This action will permanently remove this user from this event
                This cannot be undone.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Label className="my-2">
            Reason:
            <Textarea
              className="mt-2"
              //   value={value}
              //   onChange={(e) => setValue(e.target.value)}
              placeholder="reason for removing this user from this event"
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              the user will be notified about this and will know the reason for
              cancelling
            </AlertDescription>
          </Alert>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancell</AlertDialogCancel>
            <Button>Submits</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RevomeFromEvent;
