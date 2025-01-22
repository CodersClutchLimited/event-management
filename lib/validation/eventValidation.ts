import { z } from "zod";

export const eventSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be at least 3 characters long"),
    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters long"),
    location: z
      .string()
      .trim()
      .min(3, "Location must be at least 3 characters long"),

    schedule: z
      .object({
        start: z.date().refine((date) => date > new Date(), {
          message: "Start date must be in the future",
        }),
        end: z.date(),
      })
      .superRefine((schedule, ctx) => {
        if (schedule.end <= schedule.start) {
          ctx.addIssue({
            code: "custom",
            message: "End date must be after the start date",
            path: ["end"],
          });
        }
      }),

    registrationDeadline: z.date(),

    createdBy: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Admin ID"), // MongoDB ObjectId validation

    maxParticipants: z
      .string()

      .max(1000, "Max participants cannot exceed 1000")
      .default("100"),
    status: z
      .enum(["upcoming", "ongoing", "completed", "canceled"])
      .default("upcoming"),

    isPublished: z.boolean().default(false),
    canceledReason: z.string().nullable().optional(),

    notifications: z
      .object({
        sendReminders: z.boolean().default(true),
        reminderTimes: z.array(z.date()).optional(),
      })
      .default({ sendReminders: true }),

    createdAt: z.date().default(() => new Date()), // Ensure default date is generated dynamically
  })
  .superRefine((data, ctx) => {
    if (!data.schedule?.start) {
      ctx.addIssue({
        code: "custom",
        message: "Start date is required before setting registration deadline",
        path: ["schedule", "start"],
      });
      return;
    }

    if (data.registrationDeadline >= data.schedule.start) {
      ctx.addIssue({
        code: "custom",
        message: "Registration deadline must be before the event start date",
        path: ["registrationDeadline"],
      });
    }
  });

export type EventInput = z.infer<typeof eventSchema>;
