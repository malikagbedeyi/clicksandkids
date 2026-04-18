import type { Metadata } from "next";
import { motion } from "framer-motion";
import MagneticSocialGrid from "../../components/MagneticSocialGrid";

export const metadata: Metadata = {
  title: "Contact — Clicksandkids Photography",
  description: "Reach out to Clicksandkids to book your family session in Drogheda, Ireland.",
};

export default function ContactPage() {
  return (
    <main className="contact-page-wrapper">
      <div className="contact-container">
        
        {/* Left Side: Cinematic Header */}
        <section className="contact-visual-side">
          <span className="eyebrow">Get in Touch</span>
          <h1 className="contact-main-title">
            Capture <br/>Your <br/>Moments <br/>With Us.
          </h1>
          <div className="contact-footer-note">
             <p>© 2026 Clicksandkids. All rights reserved.</p>
          </div>
        </section>

        {/* Right Side: Essential Info */}
        <section className="contact-info-side">
          <div className="info-block">
            <h2 className="info-label">Enquiries</h2>
            <p className="info-text">
              We'd love to hear from you! Reach out to enquire about availability, packages, or any questions you may have.
            </p>
            <a href="mailto:hello@clicksandkids.ie" className="contact-link " style={{marginBottom:"20px"}}>
              hello@clicksandkids.ie
            </a>
          </div>

          <div className="info-grid mt-4">
            <div className="info-sub-block">
              <h3 className="info-label">Studio Location</h3>
              <p className="info-detail">Drogheda, <br/>Ireland</p>
            </div>
            <div className="info-sub-block">
              <h3 className="info-label">Studio Hours</h3>
              <p className="info-detail">Fri, Sat, Sun <br/>10am – 6pm</p>
            </div>
          </div>

          <div className="social-section mt-20">
            <h3 className="info-label mb-8">Social</h3>
            <MagneticSocialGrid />
            <a 
              href="https://instagram.com/clicksandkids" 
              target="_blank" 
              className="link-text text-[#C8A988] text-[10px] tracking-[4px] uppercase mt-6 block font-bold"
            >
              @clicksandkids
            </a>
          </div>

          <div className="contact-disclaimer">
            <p>Note: No raw images are shared for any package. <br/>Delivery within 7 working days.</p>
          </div>
        </section>

      </div>
    </main>
  );
}