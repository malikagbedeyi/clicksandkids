"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BookingModal from "../../components/BookingModal";

const packages = [
  { name: "Kid's Mini Session", price: "120", image: "/image/gallery/img-05.jpg", details: ["1 Outfit", "25-minute studio session", "4 Edited Images", "Plain Backdrop"] },
  { name: "Portrait Session", price: "180", details: ["1 Outfit", "40-minute studio session", "6 Edited Images", "Plain Backdrop"] },
  { name: "Kid's Standard Session", price: "220", image: "/image/gallery/img-06.jpg", details: ["2 Outfits", "45-minute studio session", "6 Edited Images", "1 Themed & 1 Plain Backdrop"] },
  { name: "Maternity Session", price: "220", details: ["1 Outfit", "1-hour studio session", "6 Edited Images", "1 Themed & 1 Plain Backdrop"] },
  { name: "African Trad Session", price: "150", image: "/image/gallery/img-03.jpg", details: ["1 Outfit", "30-minute studio session", "5 Edited Images", "Trad set build"] },
  { name: "Cake Smash (6–18 months)", price: "180", image: "/image/gallery/img-07.jpg", details: ["1 Outfit", "30-minute studio session", "6 Edited Images", "Mini balloon setup"] },
  { name: "Mummy & Me Session", price: "180", image: "/image/gallery/img-02.jpg", details: ["1 Outfit", "45-minute studio session", "4 Edited Images", "Plain Backdrop"] },
  { name: "Siblings Session (Max 3)", price: "180", details: ["1 Outfit", "45-minute studio session", "4 Edited Images", "Themed or Plain Backdrop"] },
  { name: "Twins Session", price: "300", details: ["2 Outfits", "1 hour 30-minute studio session", "6 Edited + 8 JPEGs", "1 Custom & 1 Plain Backdrop"] },
  { name: "Family Session (Max 4)", price: "250", details: ["1 Outfit", "45-minute studio session", "6 Edited Images", "Plain Backdrop"] },
  { name: "Family Premium (Max 4)", price: "350", details: ["2 Outfits for child", "1 Outfit for parents", "1 Themed Backdrop for child", "1 hour 25-minute studio session", "6 Edited Images", "Plain Backdrop for family"] },
  { name: "Kids Premium Session", price: "350", image: "/image/gallery/img-08.jpg", details: ["3 Outfits (Cake smash, Trad & more)", "1 hour 30-minute studio session", "9 Edited Images", "Trad set build", "Themed Backdrop for Cake Smash"] },
];

export default function PricingPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <main style={{ backgroundColor: '#E8E5E0', minHeight: '100vh', paddingTop: '150px', paddingBottom: '100px', paddingLeft: '20px', paddingRight: '20px', color: '#1a1a1a' }}>
      
      <BookingModal
        isOpen={!!selectedPackage} 
        onClose={() => setSelectedPackage(null)} 
        packageName={selectedPackage || ""} 
      />

      <section style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ display: 'block', fontSize: '12px', letterSpacing: '0.3em', color: '#4a4a4a', marginBottom: '20px' }}>
          PRICING & PACKAGES
        </span>
        <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', margin: 0, fontWeight: '400' }}>
          Invest in <i style={{ color: '#C8A988', fontStyle: 'italic' }}>Memories</i>
        </h1>
      </section>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {packages.map((pkg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {pkg.image && (
              <div style={{ width: '100%', maxWidth: '400px', height: '533px', position: 'relative', marginBottom: '40px', backgroundColor: '#d1cec9', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                <Image src={pkg.image} alt={pkg.name} fill style={{ objectFit: 'cover' }} />
              </div>
            )}

            <div style={{ width: '100%', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ fontFamily: 'serif', fontSize: '32px', margin: 0, fontWeight: '400' }}>{pkg.name}</h2>
                <span style={{ fontSize: '16px', letterSpacing: '2px', color: '#4a4a4a' }}>FROM: €{pkg.price}</span>
              </div>

              <div style={{ borderTop: '1px solid #d1cec9', borderBottom: '1px solid #d1cec9', padding: '40px 0', marginBottom: '40px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {pkg.details.map((detail, i) => (
                    <li key={i} style={{ fontStyle: 'italic', fontSize: '18px', color: '#4a4a4a', marginBottom: '14px', fontFamily: 'serif' }}>• {detail}</li>
                  ))}
                </ul>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button 
                  onClick={() => setSelectedPackage(pkg.name)}
                  style={{ 
                    display: 'inline-block', padding: '14px 45px', border: '1px solid #1a1a1a', borderRadius: '50px',
                    color: '#1a1a1a', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '600', cursor: 'pointer', background: 'none'
                  }}
                >
                  Book This Session
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}