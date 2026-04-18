"use server";

import { prisma } from "../../lib/db";

export type BookingEmailPayload = {
  from_name: string;
  email: string;
  phone: string;
  sessionType: string;
  preferredDate: string;
  peopleCount: string;
  childAges: string;
  message: string;
};

export async function sendBookingEmail(data: BookingEmailPayload) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const userId = process.env.EMAILJS_USER_ID;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !userId || !privateKey) {
    throw new Error("Email service is not properly configured.");
  }

  // 1. Map data to Template Params for EmailJS
  const templateParams = {
    from_name: data.from_name,
    reply_to: data.email, 
    email: data.email,
    phone: data.phone,
    session_type: data.sessionType, // Fixed: accessing data.sessionType
    preferred_date: data.preferredDate, // Fixed: accessing data.preferredDate
    people_count: data.peopleCount,
    child_ages: data.childAges,
    message: data.message
  };

  try {
    // 2. Save to Database First
    await prisma.booking.create({
      data: {
        name: data.from_name,
        email: data.email,
        phone: data.phone,
        sessionType: data.sessionType, // Matched to your Schema and Type
        preferredDate: data.preferredDate,
        peopleCount: data.peopleCount,
        childAges: data.childAges,
        message: data.message,
      }
    });

    // 3. Send via EmailJS
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: userId,
        accessToken: privateKey,
        template_params: templateParams
      })
    });

    if (!response.ok) {
      throw new Error("EmailJS failed to send.");
    }

    return true;
  } catch (error) {
    console.error("Booking recording failed:", error);
    throw error;
  }
}