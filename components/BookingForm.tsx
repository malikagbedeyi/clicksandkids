"use client";

import { useState } from "react";
import { sendBookingEmail } from "../app/booking/actions";

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      from_name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      sessionType: formData.get("package") as string,
      preferredDate: `${formData.get("date")} at ${formData.get("time")}`,
      peopleCount: formData.get("people") as string,
      childAges: formData.get("ages") as string,
      message: formData.get("notes") as string,
    };

    try {
      await sendBookingEmail(data as any);
      setSuccess(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-[#C8A988] font-serif text-3xl mb-4">Enquiry Sent</h3>
        <p className="text-white/50 uppercase tracking-widest text-xs">We'll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="booking-form-grid">
      <div className="form-group">
        <label>Full Name</label>
        <input type="text" name="name" required placeholder="Enter your Name" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" required placeholder="email@example.com" />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" required placeholder="Enter your Phone Number ..." />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Preferred Date</label>
          <input type="date" name="date" required />
        </div>
        <div className="form-group">
          <label>Preferred Time</label>
          <input type="time" name="time" required />
        </div>
      </div>

      <div className="form-group">
        <label>Session Package</label>
        <select name="package" required>
          <option value="">Select a package</option>
          <option value="Mini">Kid's Mini Session</option>
          <option value="Standard">Kid's Standard Session</option>
          <option value="Maternity">Maternity Session</option>
          <option value="Cake Smash">Cake Smash</option>
          <option value="Family">Family Session</option>
          {/* Add more as needed */}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Number of People</label>
          <input type="number" name="people" placeholder="Enter Number of people" />
        </div>
        <div className="form-group">
          <label>Ages of Children</label>
          <input type="text" name="ages" placeholder="Enter ages of children" />
        </div>
      </div>

      <div className="form-group">
        <label>Special Requests / Notes</label>
        <textarea name="notes" rows={4} placeholder="Anything we should know?"></textarea>
      </div>

      <button type="submit" disabled={loading} className="booking-submit-btn">
        {loading ? "SENDING..." : "SUBMIT BOOKING ENQUIRY"}
      </button>
    </form>
  );
}