// components/SkillSection.tsx
"use client"; // This tells Next.js this is a browser-only component

import { motion } from "framer-motion";
import Link from "next/link";

const skills = [
  { title: "Child-Friendly Studio", value: "95%" },
  { title: "Custom Themed Sets", value: "90%" },
  { title: "Professional Editing", value: "98%" },
  { title: "Fast Turnaround", value: "85%" },
];

export default function SkillSection() {
  return (
    <section className="page-shell home-section border-t border-white/5  ">
      <div className="novo-skill-layout" style={{padding:"0 8%"}}>
        <div className="novo-skill-image">
          <img src="/image/hero/img-02.jpg" alt="Creative Studio" />
          <div className="novo-image-overlay">
            <span>CLICKS & KIDS</span>
          </div>
        </div>

        <div className="novo-skill-content">
          <span className="eyebrow">The Difference</span>
          <h2 className="text-white mb-8">We Are Clicksandkids <br/>Creative Studio.</h2>
          <p className="mb-12">
            Every child's story deserves to be beautifully told. We blend professional 
            artistry with a fun, relaxed environment to capture the honest, joyful details.
          </p>

          <div className="skill-bars-grid">
            {skills.map((item) => (
              <div key={item.title} className="skill-item">
                <div className="skill-info">
                  <span className="skill-title">{item.title}</span>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="skill-percentage"
                  >
                    {item.value}
                  </motion.span>
                </div>
                <div className="skill-bar-bg">
                  <motion.div 
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: item.value }}
                    viewport={{ once: true }} 
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
          
          <Link href="/about" className="view-more-link mt-12 inline-block">
            READ MORE —
          </Link>
        </div>
      </div>
    </section>
  );
}