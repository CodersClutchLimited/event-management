"use server";

import { revalidatePath } from "next/cache"; // For revalidating the cache
import Event from "@/lib/models/event.model";
import { SendEmailWhenEventDateUpdate } from "@/lib/mail"; // Resend email service
import { EventInterfaceType } from "@/lib/types";

export async function updateEventServerAction(
  eventId: string,
  updatedData: EventInterfaceType
) {
  try {
    // Fetch the existing event
    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) return { ststus: 404, message: "Event not found" };

    // Check if start or end date changed
    const startChanged =
      existingEvent.schedule.start.toISOString() !==
      new Date(updatedData.schedule.start).toISOString();
    const endChanged =
      existingEvent.schedule.end.toISOString() !==
      new Date(updatedData.schedule.end).toISOString();

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, {
      new: true,
    });

    // Notify registered users if date changed
    if (startChanged || endChanged) {
      const registeredUsers = existingEvent.registeredUsers || []; // Assuming you store registered users
      const emails = registeredUsers.map((user: any) => user.email);

      const subject = "Event Date Updated";
      const body = `The event "${existingEvent.title}" has been rescheduled.\n\nNew Start Date: ${updatedEvent.schedule.start}\nNew End Date: ${updatedEvent.schedule.end}`;

      await SendEmailWhenEventDateUpdate(emails, subject, body);
    }

    // Revalidate cache for fresh data
    revalidatePath("/events"); // Adjust the path based on your routing

    return {
      status: 200,
      message: "Event updated successfully",
    };
  } catch (error) {
    return { status: 200, message: "Error updating event", error };
  }
}
