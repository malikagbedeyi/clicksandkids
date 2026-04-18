"use server";
import { prisma } from "./db";
import { revalidatePath } from "next/cache";

export async function getApprovedTestimonials() {
  return await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllTestimonials() {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createTestimonial(data: { name: string; content: string; session: string }) {
  const result = await prisma.testimonial.create({ data });
  revalidatePath("/");
  return result;
}

export async function toggleApproval(id: string, currentState: boolean) {
  await prisma.testimonial.update({
    where: { id },
    data: { approved: !currentState },
  });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}