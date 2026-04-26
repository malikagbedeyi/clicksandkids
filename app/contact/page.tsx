"use client";
import type { Metadata } from "next";
import { motion } from "framer-motion";
import MagneticSocialGrid from "../../components/MagneticSocialGrid";

export default function ContactPage() {
  return (
    <main className="contact-page-wrapper">
      {/* Dynamic Overlay for depth */}
      <div className="section-overlay"></div>
      
      <div className="contact-container">
        {/* Left Side: Editorial Typography */}
        <motion.section 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="contact-visual-side"
        >
          <div
          >
            <span className="eyebrow">Get in Touch</span>
            <h1 className="contact-main-title">
              Capture <br/><i>Your</i> <br/>Moments <br/>With Us.
            </h1>
          </div>
          
          <div className="contact-footer-note" >
             <p>© 2026 Clicksandkids. All rights reserved.</p>
          </div>
        </motion.section>

        {/* Right Side: Elegant Glassmorphism Info */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="contact-info-side"
        >
          <div className="glass-card">
            <div className="info-block">
              <h2 className="info-label">Enquiries</h2>
              <p className="info-text">
                We'd love to hear from you! Reach out to enquire about availability, packages, or any questions you may have.
              </p>
              <a href="mailto:Ebun@clickandkids.com" className="contact-email-link">Ebun@clickandkids.com</a>
              <a className="contact-email-phone" href="tel:+353 85 145 8174">+353 85 145 8174</a>
            </div>

            <div className="info-grid">
              <div className="info-sub-block">
                <h3 className="info-label">Studio Location</h3>
                <p className="info-detail">Drogheda, <br/><span>Ireland</span></p>
              </div>
              <div className="info-sub-block">
                <h3 className="info-label">Studio Hours</h3>
                <p className="info-detail">Fri, Sat, Sun <br/><span>10am – 6pm</span></p>
              </div>
            </div>

            <div className="social-section">
              <h3 className="info-label">Social</h3>
              <div className="magnetic-wrapper">
                <MagneticSocialGrid />
              </div>
              <a 
                href="https://instagram.com/clicksandkids" 
                target="_blank" 
                className="instagram-tag"
              >
                @clicksandkids
              </a>
            </div>

            <div className="contact-disclaimer">
              <p>Note: No raw images are shared for any package.</p>
              <p className="highlight">Delivery within 7 working days.</p>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}