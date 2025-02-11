import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  eventId: { type: String, unique: true, required: true }, // Ensure it's always set
  schedule: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  // state: { type: String, enum: ["active", "cancelled"]
  registrationDeadline: { type: Date, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  maxParticipants: { type: Number, default: 100 },
  registeredUsers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      registeredAt: { type: Date, default: Date.now },
      checkInStatus: { type: Boolean, default: false },
    },
  ],
  waitlist: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      joinedAt: { type: Date, default: Date.now },
    },
  ],
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed", "cancelled"],
    default: "upcoming",
  },
  isPublished: { type: Boolean, default: false },
  canceledReason: { type: String, default: null },
  notifications: {
    sendReminders: { type: Boolean, default: true },
    reminderTimes: [{ type: Date }],
  },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Generate eventId safely before validation
EventSchema.pre("validate", async function (next) {
  if (!this.eventId) {
    try {
      // Find the last event with a valid eventId format
      const lastEvent = await mongoose
        .model("Event")
        .findOne({ eventId: /^EV-\d+$/ })
        .sort({ createdAt: -1 })
        .exec();

      let nextEventId = "EV-001";
      if (lastEvent && lastEvent.eventId) {
        const lastNumber = parseInt(lastEvent.eventId.replace("EV-", ""), 10);
        nextEventId = `EV-${(lastNumber + 1).toString().padStart(3, "0")}`;
      }

      this.eventId = nextEventId;
    } catch (error) {
      return next(
        new Error("Error generating event ID: " + (error as Error).message)
      );
    }
  }
  next();
});

const Event = mongoose.models?.Event || mongoose.model("Event", EventSchema);
export default Event;
