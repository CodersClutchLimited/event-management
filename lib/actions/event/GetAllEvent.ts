"use server";
import Event from "@/lib/models/event.model";
import { EventInterfaceType } from "@/lib/types";
import { deepConvertToPlainObject } from "@/lib/utils";

export const GetAllEvent = async ({
  query,
  page = 1,
  limit = 10,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const skip = (page - 1) * limit;

    const pipeline = [
      //   {
      //     $match: {
      //       ...(startDate &&
      //         endDate && {
      //           "schedule.start": {
      //             $gte: new Date(startDate),
      //             $lte: new Date(endDate),
      //           },
      //         }),
      //     },
      //   },
      { $skip: skip },
      { $limit: limit },
      // sort by latest
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "creator",
          pipeline: [
            {
              $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
              },
            },
          ],
        },
      },
      { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          title: 1,
          description: 1,
          location: 1,
          eventId: 1,
          schedule: 1,
          registrationDeadline: 1,
          maxParticipants: 1,
          registeredUsers: 1,
          waitlist: 1,
          status: 1,
          isPublished: 1,
          notifications: 1,
          createdAt: 1,
          "creator.firstName": 1,
          "creator.lastName": 1,
          "creator.email": 1,
        },
      },
    ];

    if (query) {
      pipeline.unshift({
        $search: {
          index: "event",
          text: {
            query,
            fuzzy: { maxEdits: 1, prefixLength: 3, maxExpansions: 50 },
            path: { wildcard: "*" },
          },
        },
      });
    }

    const EventData = await Event.aggregate(pipeline);
    const Events = deepConvertToPlainObject(EventData);
    const totalCount = await Event.countDocuments();

    return {
      status: 200,
      data: Events as EventInterfaceType,
      isPreviousPage: page > 1,
      isNextPage: totalCount > skip + EventData.length,
      totalCount,
    };
  } catch (error) {
    return { status: 500, message: "Failed to get events" };
  }
};

// get single event by id
export const GetSingleEvent = async (eventId: string) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return { status: 404, message: "Event not found" };
    }
    return { status: 200, data: deepConvertToPlainObject(event) };
  } catch {
    return { status: 500, message: "Error getting event" };
  }
};

// know the total number of upcomming event
export const GetTotalUpcomingEvent = async () => {
  try {
    const total = await Event.countDocuments({ status: "upcoming" });
    return { status: 200, data: total };
  } catch {
    return { status: 500, message: "Error getting total upcoming event" };
  }
};
