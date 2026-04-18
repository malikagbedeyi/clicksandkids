import type { Metadata } from "next";
import BookingForm from "../../components/BookingForm";

export const metadata: Metadata = {
  title: "Booking — Clicksandkids Photography",
  description: "Secure your photography session with our elegant booking experience.",
};

const bookingSteps = [
  { step: "01", title: "Choose Your Package", desc: "Browse our session options and select the package that best suits your family." },
  { step: "02", title: "Pick a Date & Time", desc: "Use the form or contact us via Instagram/Email to choose your preferred slot." },
  { step: "03", title: "Confirm & Deposit", desc: "A booking deposit is required to secure your session and confirm your slot." },
  { step: "04", title: "Prepare Your Session", desc: "We'll send a guide with tips on what to wear and how to get the little ones ready." },
  { step: "05", title: "Shoot Day!", desc: "Arrive, relax, and let us do the rest. Our sessions are fun and laid-back." },
  { step: "06", title: "Receive Your Gallery", desc: "Within 7 working days, your edited gallery will be delivered to cherish forever." },
];

export default function BookingPage() {
  return (
    <main className="booking-page-wrapper">
      <div className="booking-grid-container">
        
        {/* Left Side: Editorial Instructions */}
        <aside className="booking-instructions">
          <span className="eyebrow">Booking</span>
          <h1 className="booking-main-title">How to Book <br/> Your Session</h1>
          
          <div className="steps-list">
            {bookingSteps.map((s) => (
              <div key={s.step} className="step-item">
                <span className="step-number">{s.step}</span>
                <div className="step-text">
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Side: High-End Form */}
        <section className="booking-form-section">
          <div className="form-inner-box">
            <div className="form-header">
              <h2 className="font-serif text-4xl mb-2 text-white italic">Booking Enquiry Form</h2>
              <p className="text-[#C8A988] text-[10px] tracking-[4px] uppercase font-bold">
                Fill in the details below to start your story
              </p>
            </div>
            <BookingForm />
          </div>
        </section>

      </div>
    </main>
  );
}