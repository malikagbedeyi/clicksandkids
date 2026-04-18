"use client";

import { createTestimonial } from "../../lib/testimonials";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ReviewPage() {
  const [sent, setSent] = useState(false);

  async function handleAction(formData: FormData) {
    const data = {
      name: formData.get("name") as string,
      session: formData.get("session") as string,
      content: formData.get("content") as string,
    };
    await createTestimonial(data);
    setSent(true);
  }

  if (sent) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center pt-20" style={{padding:"160px 0"}}>
           <div className="mb-10">
  <Link href="/admin" className="text-white/30 hover:text-[#C8A988] transition-colors text-[10px] tracking-[3px] uppercase">
    ← Back to Hub
  </Link>
</div>
        <div className="text-center" style={{textAlign:"center"}}>
          <h2 className="text-white font-serif text-4xl italic">Thank You!</h2>
          <p className="text-[#C8A988] mt-4 uppercase tracking-widest text-xs">Your story has been sent for approval.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-20 px-6" style={{padding:"160px 0"}}>
      <div className="manage-media-shell !max-w-2xl !p-12">
        <div className="text-center mb-10">
          <span className="eyebrow">Feedback</span>
          <h1 className="text-white font-serif text-4xl mt-2 italic">Share Your Experience</h1>
        </div>

        <form action={handleAction} className="flex flex-col gap-6" style={{margin:"30px 0 0 "}}>
          <div className="form-group">
            <label className="admin-label">Your Name</label>
            <input name="name" required className="admin-field !rounded-xl" placeholder="Enter Your Name" />
          </div>
          
          <div className="form-group">
            <label className="admin-label">Session Type</label>
            <input name="session" required className="admin-field !rounded-xl" placeholder="e.g. Maternity Session" />
          </div>

          <div className="form-group">
            <label className="admin-label">Your Message</label>
            <textarea name="content" required rows={5} className="admin-field !rounded-xl" placeholder="Tell us about your day at the studio..." />
          </div>

          <button type="submit" className="secondary-button !w-full !rounded-full !py-4">
            Submit Review
          </button>
        </form>
      </div>
    </main>
  );
}