"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "How far in advance should I book?", a: "We recommend booking at least 2–4 weeks in advance to secure your preferred date, especially around weekends and holidays." },
  { q: "What should my child wear?", a: "Wear something comfortable and colourful! We'll send you a detailed style guide after booking. Avoid very busy patterns or large logos." },
  { q: "Can I bring props?", a: "Absolutely! Personal props such as toys, teddies, or blankets are very welcome and can add a lovely personal touch to your session." },
  { q: "Do you offer newborn sessions?", a: "We currently cater to children from 6 months and up (Cake Smash), as well as maternity, family, and sibling sessions." },
  { q: "What if my child won't cooperate on the day?", a: "Don't worry — it happens! Our sessions are relaxed and child-led. We'll take breaks, use fun prompts, and never rush. Great shots always come!" },
  { q: "Can I bring extra people?", a: "Yes! Additional guests can be added for €50 per person. Please let us know in advance so we can plan the session accordingly." },
  { q: "How will I receive my photos?", a: "Your edited gallery will be delivered digitally within 7 working days. You can then download, print, and share your images." },
  { q: "Do you send raw/unedited images?", a: "No — we only deliver professionally edited images. Raw files are not included in any package." }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section-wrapper">
      <div className="faq-content-container">
        <div className="faq-header">
          <span className="eyebrow">Questions</span>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`faq-trigger ${openIndex === index ? 'active' : ''}`}
              >
                <span className="faq-q-text">{faq.q}</span>
                <div className="faq-plus-icon">
                  <div className="v-line"></div>
                  <div className="h-line"></div>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="faq-answer-inner">
                      <p>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}