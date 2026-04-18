// components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" }, // ADDED PRICING
  { label: "Booking", href: "/booking" },
  { label: "Contact", href: "/contact" },
  { label: "Testimonials", href: "/reviews" }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="nav-shell">
        <Link href="/" className="brand">
  <img 
    src="/image/logo/logo-03.png" 
    alt="Clicks & Kids Logo" 
    className="nav-logo-img"
  />
</Link>

        <nav className="site-nav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <button 
          className="menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-menu-overlay"
          >
            <div className="mobile-menu-content">
              <nav className="mobile-nav">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link 
                      href={item.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="mobile-nav-link"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}