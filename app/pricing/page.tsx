"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "../../components/Footer";

const packages = [
  { name: "Kid's Mini", price: "100", details: ["1 Outfit", "25-min Session", "4 Edited + 2 JPEGs", "Plain Backdrop"], img: "/image/gallery/img-08.jpg" },
  { name: "Portrait", price: "150", details: ["1 Outfit", "35-min Session", "4 Edited + 4 JPEGs", "Plain Backdrop"], img: "/image/gallery/img-01.jpg" },
  { name: "Kid's Standard", price: "200", details: ["2 Outfits", "45-min Session", "6 Edited + 6 JPEGs", "1 Themed & 1 Plain"], img: "/image/gallery/img-03.jpg" },
  { name: "Maternity", price: "220", details: ["2 Outfits", "1-hour Session", "6 Edited + 6 JPEGs", "1 Themed & 1 Plain"], img: "/image/gallery/img-04.jpg" },
  { name: "African Trad", price: "120", details: ["1 Outfit", "35-min Session", "5 Edited + 5 JPEGs", "Trad Set Build"], img: "/image/gallery/img-05.jpg" },
  { name: "Cake Smash", price: "180", note: "6–18 months", details: ["1 Outfit", "45-min Session", "6 Edited + 2 JPEGs", "Mini Balloon Setup"], img: "/image/gallery/img-06.jpg" },
  { name: "Mummy & Me", price: "150", details: ["1 Outfit", "45-min Session", "4 Edited + 6 JPEGs", "Plain Backdrop"], img: "/image/gallery/img-02.jpg" },
  { name: "Siblings", price: "150", note: "Max 3", details: ["1 Outfit", "45-min Session", "4 Edited + 6 JPEGs", "Themed or Plain"], img: "/image/gallery/img-07.jpg" },
  { name: "Twins", price: "250", details: ["2 Outfits", "1-hour Session", "6 Edited + 8 JPEGs", "1 Custom & 1 Plain"], img: "/image/gallery/img-04.jpg" },
  { name: "Family", price: "200", note: "Max 4", details: ["1 Outfit", "1-hour Session", "6 Edited + 8 JPEGs", "Plain Backdrop"], img: "/image/gallery/img-02.jpg" },
];

const addOns = [
  { title: "Extra Person", price: "€50" },
  { title: "Extra Outfit", price: "€100" },
  { title: "Extra Images", price: "€10 / image" },
  { title: "Express Delivery", price: "€50" },
  { title: "Custom Theme Backdrop", price: "€120" },
];


export default function PricingPage() {
  return (
    <>
    <main className="bg-[#0A0A0A] w-full ">

      <section className="novo-pricing-wrapper w-full relative ">

        <div className="pricing-header" style={{display:"flex",flexDirection:"column",justifyContent:"center",flexWrap:"wrap",alignContent:"center"}} >
      <span className="eyebrow">— Sessions & Pricing —</span>
      <h2 className="addon-main-title">Photography Packages</h2>
      <p>Choose the session that's right for your family. All packages include professionally edited images and JPEG digital files.</p>
    </div>

        <div className="novo-pricing-container flex flex-nowrap overflow-x-auto no-scrollbar">
          {packages.map((pkg, idx) => (
            <motion.div 
              key={pkg.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="pricing-column group flex-shrink-0 w-[85vw] md:w-[33.33vw] relative"
            >
              <div className="column-bg">
                <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover" />
                <div className="column-overlay" />
              </div>

              <div className="column-header">
                <span className="eyebrow !text-white/70">{pkg.name}</span>
                {pkg.note && <p className="text-[#C8A988] text-[9px] tracking-widest uppercase mt-1">{pkg.note}</p>}
              </div>

              <div className="column-center">
                <h2 className="huge-price"><span className="currency">€</span>{pkg.price}</h2>
                <Link href="/booking" className="purchase-btn">PURCHASE</Link>
              </div>

              <div className="column-footer">
                <div className="options-trigger">
                  <span>OPTIONS</span>
                  <span className="plus-icon">+</span>
                </div>
                <div className="hidden-details">
                  <ul className="details-list">
                    {pkg.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

     {/* 2. ADD-ONS SECTION - Editorial Redesign */}
      <section className= "addon-section ">
        <div className="addon-container " >
    <div className="addon-header">
      <span className="eyebrow">Enhancements</span>
      <h2 className="addon-main-title">Elevate <br/> Your <br/> Session</h2>
    </div>

   <div className="addon-list-wrap">
      {addOns.map((item, idx) => (
        <div key={item.title} className="addon-row group">
          <div className="addon-row-content">
            <div className="addon-name-side">
              <span className="addon-num">0{idx + 1}</span>
              <h3 className="addon-item-name">{item.title}</h3>
            </div>
            <div className="addon-price-side">
              <span className="addon-item-price">{item.price}</span>
            </div>
          </div>
          <div className="addon-line" />
        </div>
      ))}
      
      {/* Footer Notes */}
      <div className="addon-footer-notes">
        <p>📦 Delivery time: 7 working days</p>
        <p>ℹ️ Raw images are not included in any package</p>
      </div>
    </div>

  </div>
</section>
    </main>
    <Footer />
    </>
  );
}