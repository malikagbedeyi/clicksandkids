"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
   <footer className="footer-section">
  <div className="footer-container">
    {/* Upper Footer: Branding & Big CTA */}
    <div className="footer-upper">
<div className="footer-brand-area">
  <Link href="/">
    <img 
      src="/image/logo/logo-03.png" 
      alt="Clicks & Kids Logo" 
      className="footer-logo-img"
    />
  </Link>
  <p className="footer-tagline mt-6">
    Capturing the magic of childhood, <br /> 
    one milestone at a time.
  </p>
</div>
      
      <div className="footer-cta-area">
        <span className="eyebrow">— Ready to start? —</span>
        <Link href="/booking" className="footer-huge-link">
          Book a Session <span className="arrow">→</span>
        </Link>
      </div>
    </div>

    {/* Middle Footer: Links & Info */}
    <div className="footer-middle">
      <div className="footer-column">
        <span className="footer-label">Navigation</span>
        <ul className="footer-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/pricing">Pricing</Link></li>
        </ul>
      </div>

      <div className="footer-column">
        <span className="footer-label">Contact</span>
        <p className="footer-info">hello@clicksandkids.ie</p>
        <p className="footer-info">Drogheda & Dublin, Ireland</p>
        <p className="footer-info">+353 (0) 8X XXX XXXX</p>
      </div>

      <div className="footer-column">
        <span className="footer-label">Follow Us</span>
        <ul className="footer-links">
          <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
          <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
          <li><a href="https://pinterest.com" target="_blank">Pinterest</a></li>
        </ul>
      </div>

      <div className="footer-column">
        <span className="footer-label">Studio Hours</span>
        <p className="footer-info italic">By Appointment Only</p>
        <p className="footer-info">Mon — Sat: 10:00 - 18:00</p>
      </div>
    </div>

    {/* Bottom Footer: Copyright */}
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Clicksandkids Photography. All rights reserved.</p>
      <div className="footer-legal">
        <Link href="/privacy">Privacy Policy</Link>
        <span className="mx-2">•</span>
        <Link href="/terms">Terms of Service</Link>
      </div>
    </div>
  </div>
</footer>

  )}