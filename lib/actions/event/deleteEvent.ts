"use server";
import Event from "@/lib/models/event.model";
import { revalidatePath } from "next/cache";
// import { Error } from "mongoose";

export const deleteEventServerAction = async (eventId: string) => {
  console.log(eventId);

  try {
    if (!eventId) {
      return { status: 400, message: "Event ID is required" };
    }

    const deletedEvent = await Event.findOneAndDelete({ _id: eventId });

    if (!deletedEvent) {
      return { status: 404, message: "Event not found" };
    }

    revalidatePath("/event");
    return {
      status: 200,
      message: "Event deleted successfully",
    };
  } catch {
    return {
      status: 500,
      message: "Error deleting event",
    };
  }
};
