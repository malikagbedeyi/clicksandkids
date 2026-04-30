"use server";

import { prisma } from "../db";

export async function createBooking(formData: any) {
  try {
    const booking = await prisma.booking.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        sessionType: formData.sessionType,
        preferredDate: formData.preferredDate,
        message: formData.message,
      },
    });
    return { success: true, booking };
  } catch (error) {
    console.error("Booking Error:", error);
    return { success: false };
  }
}