"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from "../lib/actions/booking";

export default function BookingModal({ isOpen, onClose, packageName }: { isOpen: boolean, onClose: () => void, packageName: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("11:00 AM");

  // Only allow Saturdays (6) and Sundays (0)
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!startDate) return alert("Please select a date");
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      sessionType: packageName,
      preferredDate: `${startDate.toLocaleDateString()} at ${selectedTime}`,
      message: formData.get("message"),
    };

    const res = await createBooking(data);
    if (res.success) setSuccess(true);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" style={{zIndex:"99999999" }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="bg-[#F2F0ED] w-full max-w-xl rounded-3xl p-8 md:p-14 relative shadow-2xl border border-white/20 overflow-y-auto max-h-[95vh]"
        >
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-all text-3xl font-light">×</button>

          {success ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 text-3xl">✓</span>
              </div>
              <h2 className="font-serif text-4xl mb-4">Almost Done!</h2>
              <p className="text-gray-500 mb-10 leading-relaxed">Your request for the <strong>{packageName}</strong> has been sent. We'll be in touch within 24 hours.</p>
              <button onClick={onClose} className="w-full py-4 bg-black text-white rounded-xl text-[11px] tracking-[4px] uppercase font-bold">RETURN TO SITE</button>
            </div>
          ) : (
            <div className="w-full">
              <header className="mb-12">
                <span className="text-[10px] tracking-[4px] text-[#C8A988] uppercase font-bold block mb-3">Reserve your session</span>
                <h2 className="font-serif text-4xl md:text-5xl text-[#cfa77b]">{packageName}</h2>
              </header>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Text Inputs */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="relative">
                    <input required name="name" placeholder="Full Name" className="peer w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#C8A988] transition-all placeholder-transparent" />
                    <label className="absolute left-0 -top-3.5 text-gray-500 text-[10px] uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#C8A988]">Full Name</label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input required type="email" name="email" placeholder="Email" className="peer w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#C8A988] transition-all placeholder-transparent" />
                      <label className="absolute left-0 -top-3.5 text-gray-500 text-[10px] uppercase tracking-widest peer-placeholder-shown:top-3 peer-focus:-top-3.5">Email Address</label>
                    </div>
                    <div className="relative">
                      <input required name="phone" placeholder="Phone" className="peer w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#C8A988] transition-all placeholder-transparent" />
                      <label className="absolute left-0 -top-3.5 text-gray-500 text-[10px] uppercase tracking-widest peer-placeholder-shown:top-3 peer-focus:-top-3.5">Phone Number</label>
                    </div>
                  </div>
                </div>

                {/* Custom Date & Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] tracking-widest text-gray-400 uppercase mb-3">Preferred Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      filterDate={isWeekday}
                      placeholderText="Select a Weekend"
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-[#C8A988]/20 focus:border-[#C8A988] transition-all"
                      dateFormat="MMMM d, yyyy"
                      minDate={new Date()}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] tracking-widest text-gray-400 uppercase mb-3">Available Slot</label>
                    <div className="flex gap-2">
                      {["11:00 AM", "03:00 PM"].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`flex-1 py-3 rounded-xl border transition-all text-xs font-bold tracking-wider ${
                            selectedTime === time 
                            ? "bg-white text-[#cfa77b] border-[#cfa77b]" 
                            : "bg-white text-gray-400 border-gray-200 hover:border-[#C8A988]"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative pt-4">
                   <textarea name="message" placeholder="Notes" rows={2} className="peer w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-[#C8A988] transition-all placeholder-transparent resize-none" />
                   <label className="absolute left-0 -top-1  text-[#cfa77b] text-[10px] uppercase tracking-widest">Additional Notes</label>
                </div>

                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full py-5 bg-white text-[#cfa77b] text-[11px] tracking-[5px] uppercase font-bold hover:bg-[#C8A988] hover:text-white transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] mt-6"
                >
                  {loading ? "Processing..." : "Confirm Booking Request"}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}