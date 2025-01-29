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
import { IUser } from "@/lib/types";

const DeleteStaff = ({ user }: { user: IUser }) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="w-full flex justify-between">
            Delete <Trash className="text-destructive" />
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
                Delete Event
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-2">
                Are you sure you want to delete this user{" "}
                <span className="font-bold">{user?.firstName}</span>?
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

          <Label className="my-2">
            Event Number:
            <Input
              className="mt-2"
              //   value={value}
              //   onChange={(e) => setValue(e.target.value)}
              placeholder="Enter User First Name to confirm this operations"
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
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

export default DeleteStaff;
