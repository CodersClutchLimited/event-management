"use server";

import { SendInvitationLink } from "@/lib/mail";
import { User } from "@/lib/models/auth.model";

export const SendInvitation = async (formData) => {
  try {
    // check if staff exists before adding
    const staff = await User.findOne({ email: formData.email } );
    if (!staff) {
      return { status: 404, message: "Staff not found" };
    }
    // const staff = await User.create(formData)
    // send invitation link to staff's email address using SendInvitationLink function from mail.ts file
    await SendInvitationLink(formData.email);
    return { status: 200, message: "Invitation link sent successfully!" };
  } catch  {
    return { status: 500, message: "Failed to send invitation link" };
  }
};
