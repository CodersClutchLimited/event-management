import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const WaitlistUsers = () => {
  return (
    <Card>
      <CardHeader>
        <CardHeader>
          <CardTitle>Waitlist users</CardTitle>
          <CardDescription>
            View all users currently on the waitlist (3)
          </CardDescription>
        </CardHeader>
      </CardHeader>
      <CardContent className="space-y-8"></CardContent>
    </Card>
  );
};

export default WaitlistUsers;
