"use server";

import { prisma } from "../db";
import emailjs from "@emailjs/nodejs";

export async function createBooking(data: any) {
  try {
    // 1. Save to Database (Already doing this)
    const booking = await prisma.booking.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        sessionType: data.sessionType,
        preferredDate: data.preferredDate,
        message: data.message,
      },
    });

    // 2. Send the Email
    // These variables match your .env keys
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      {
        client_name: data.name,
        client_email: data.email,
        client_phone: data.phone,
        session_type: data.sessionType,
        booking_date: data.preferredDate,
        message: data.message,
      },
      {
        publicKey: process.env.EMAILJS_USER_ID,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    return { success: true };
  } catch (error) {
    console.error("Booking/Email Error:", error);
    return { success: false };
  }
}