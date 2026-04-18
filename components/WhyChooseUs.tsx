"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    title: "Child-Friendly Studio",
    desc: "A relaxed, fun environment where kids can be themselves.",
    icon: "✨", 
  },
  {
    title: "Custom Themed Sets",
    desc: "Tailored backdrops and themed builds for every occasion.",
    icon: "🎨",
  },
  {
    title: "Professional Editing",
    desc: "Every image is carefully retouched and colour-graded.",
    icon: "📸",
  },
  {
    title: "Fast Turnaround",
    desc: "Your gallery delivered within 7 working days.",
    icon: "⏱",
  },
  {
    title: "All Ages Welcome",
    desc: "Newborns, toddlers, big kids, and whole families.",
    icon: "👨‍👩‍👧",
  },
  {
    title: "Milestone Specialists",
    desc: "Cake smash, maternity, African Trad & more.",
    icon: "💛",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-section">
      <div className="max-w-[1200px] mx-auto px-4">
        <span className="eyebrow">Why Choose Us</span>
        <h2 className="text-white font-serif text-5xl tracking-tight mt-4">
          The Clicksandkids Difference
        </h2>

        <div className="why-choose-grid">
          {reasons.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="why-choose-item group"
            >
              {/* Gold Circle */}
              <div className="why-choose-circle">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">
                    {item.icon}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="why-choose-title">
                {item.title}
              </h3>
              <p className="why-choose-desc">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}