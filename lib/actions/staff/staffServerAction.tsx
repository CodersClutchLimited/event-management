"use server";

import { SendInvitationLink } from "@/lib/mail";

export const SendInvitation = async () => {
  try {
    await SendInvitationLink();
    return { status: 200, message: "Invitation link sent successfully!" };
  } catch  {
    return { status: 500, message: "Failed to send invitation link" };
  }
};
