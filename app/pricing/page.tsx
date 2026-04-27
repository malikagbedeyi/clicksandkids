"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const packages = [
  { 
    name: "Kid's Mini Session", 
    price: "120", 
    image: "/image/gallery/img-07.jpg", // Child with cake on face
    details: ["1 Outfit", "25-minute studio session", "4 Edited Images", "Plain Backdrop"] 
  },
  { 
    name: "Portrait Session", 
    price: "180", 
    image: "/image/gallery/img-01.jpg", // Woman in brown blazer
    details: ["1 Outfit", "40-minute studio session", "6 Edited Images", "Plain Backdrop"] 
  },
  { 
    name: "Kid's Standard Session", 
    price: "220", 
    image: "/image/gallery/img-06.jpg", // Child in red dress
    details: ["2 Outfits", "45-minute studio session", "6 Edited Images", "1 Themed & 1 Plain Backdrop"] 
  },
  { 
    name: "Maternity Session", 
    price: "220", 
    image: "/image/gallery/img-04.jpg", // Pregnant woman with child
    details: ["1 Outfit", "1-hour studio session", "6 Edited Images", "1 Themed & 1 Plain Backdrop"] 
  },
  { 
    name: "African Trad Session", 
    price: "150", 
    image: "/image/gallery/img-03.jpg", // Boy in traditional blue attire
    details: ["1 Outfit", "30-minute studio session", "5 Edited Images", "Trad set build"] 
  },
  { 
    name: "Cake Smash (6–18 months)", 
    price: "180", 
    image: "/image/gallery/img-05.jpg", // Child with purple balloons
    details: ["1 Outfit", "30-minute studio session", "6 Edited Images", "Mini balloon setup"] 
  },
  { 
    name: "Mummy & Me Session", 
    price: "180", 
    image: "/image/gallery/img-02.jpg", // Mother hugging child
    details: ["1 Outfit", "45-minute studio session", "4 Edited Images", "Plain Backdrop"] 
  },
  { 
    name: "Siblings Session (Max 3)", 
    price: "180", 
    image: "/image/gallery/img-06.jpg", 
    details: ["1 Outfit", "45-minute studio session", "4 Edited Images", "Themed or Plain Backdrop"] 
  },
  { 
    name: "Twins Session", 
    price: "300", 
    image: "/image/gallery/img-05.jpg", 
    details: ["2 Outfits", "1 hour 30-minute studio session", "6 Edited + 8 JPEGs", "1 Custom & 1 Plain Backdrop"] 
  },
  { 
    name: "Family Session (Max 4)", 
    price: "250", 
    image: "/image/gallery/img-04.jpg", 
    details: ["1 Outfit", "45-minute studio session", "6 Edited Images", "Plain Backdrop"] 
  },
  { 
    name: "Family Premium (Max 4)", 
    price: "350", 
    image: "/image/hero/photo-img.jpg", 
    details: ["2 Outfits for child", "1 Outfit for parents", "1 Themed Backdrop for child", "1 hour 25-minute studio session", "6 Edited Images", "Plain Backdrop for family"] 
  },
  { 
    name: "Kids Premium Session", 
    price: "350", 
    image: "/image/gallery/img-08.jpg", // Child in traditional green/orange outfit on throne
    details: ["3 Outfits (Cake smash, Trad & more)", "1 hour 30-minute studio session", "9 Edited Images", "Trad set build", "Themed Backdrop for Cake Smash"] 
  },
];

const addOns = [
  { title: "Wedding Album", price: "from €400" },
  { title: "Additional Photographer", price: "€100 p/h (min 4hrs)" },
  { title: "Pre Wedding Shoot", price: "from €350" },
  { title: "Civil Registry (2-3 hours)", price: "from €400" },
  { title: "Proposal / Engagement", price: "from €400" },
  { title: "Large Canvas Wall Frame", price: "€100" },
];

export default function PricingPage() {
  return (
    <main style={{ backgroundColor: '#E8E5E0', minHeight: '100vh', paddingTop: '150px', paddingBottom: '100px', paddingLeft: '20px', paddingRight: '20px', color: '#1a1a1a' }}>
      
      {/* Hero Section */}
      <section style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '80px' }}>
        <span style={{ display: 'block', fontSize: '12px', letterSpacing: '0.3em', color: '#4a4a4a', marginBottom: '20px' }}>
          PRICING & PACKAGES
        </span>
        <h1 style={{ fontFamily: 'serif', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', margin: 0, fontWeight: '400' }}>
          Invest in <i style={{ color: '#C8A988', fontStyle: 'italic' }}>Memories</i>
        </h1>
      </section>

      {/* Packages List */}
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {packages.map((pkg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Image Container */}
            <div style={{ width: '100%', maxWidth: '400px', height: '533px', position: 'relative', marginBottom: '40px', backgroundColor: '#d1cec9', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <Image 
                src={pkg.image} 
                alt={pkg.name} 
                fill 
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Info Section */}
            <div style={{ width: '100%', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '10px' }}>
                <h2 style={{ fontFamily: 'serif', fontSize: '32px', margin: 0, fontWeight: '400', lineHeight: '1.2' }}>{pkg.name}</h2>
                <span style={{ fontSize: '16px', letterSpacing: '2px', color: '#4a4a4a', fontWeight: '300' }}>FROM: €{pkg.price}</span>
              </div>

              {/* Decorative Borders around details */}
              <div style={{ borderTop: '1px solid #d1cec9', borderBottom: '1px solid #d1cec9', padding: '40px 0', marginBottom: '40px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {pkg.details.map((detail, i) => (
                    <li key={i} style={{ fontStyle: 'italic', fontSize: '18px', color: '#4a4a4a', marginBottom: '14px', fontFamily: 'serif', opacity: 0.9 }}>
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Centered Button */}
              {/* <div style={{ textAlign: 'center' }}>
                <Link href="/booking" style={{ 
                  display: 'inline-block',
                  padding: '14px 45px',
                  border: '1px solid #1a1a1a',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  color: '#1a1a1a',
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  transition: '0.3s'
                }}>
                  Book & Pay Now
                </Link>
              </div> */}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Ons */}
      <section style={{ maxWidth: '600px', margin: '150px auto 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'serif', fontSize: '36px', marginBottom: '50px', fontWeight: '400' }}>Add Ons</h2>
        <div style={{ marginBottom: '80px' }}>
          {addOns.map((item, i) => (
            <p key={i} style={{ fontStyle: 'italic', color: '#4a4a4a', fontSize: '18px', margin: '20px 0', fontFamily: 'serif' }}>
              *{item.title} — {item.price}
            </p>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #d1cec9', paddingTop: '40px', fontSize: '13px', fontStyle: 'italic', color: '#777', lineHeight: '1.8' }}>
          <p>Note: No raw images are shared for any package.</p>
          <p>Delivery within 7 working days.</p>
        </div>
      </section>
    </main>
  );
}