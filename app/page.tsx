// app/page.tsx
import { getPhotos } from "../lib/photos"; 
import HeroContent from "../components/HeroContent";
import Link from "next/link";
import SkillSection from "../components/SkillSection";
import LatestWorks from "../components/LatestWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialSlider from "../components/TestimonialSlider";
import Footer from "../components/Footer";
import { getApprovedTestimonials } from "../lib/testimonials";
import FAQSection from "../components/FAQSection";

export default async function HomePage() {
  const allMedia = await getPhotos();
  const liveTestimonials = await getApprovedTestimonials();
  
  const previewPackages = [
    { name: "Kid's Mini", price: "€100", details: "1 Outfit, 4 Edited Images, 25-min session" },
    { name: "Portrait Session", price: "€150", details: "1 Outfit, 4 Edited + 4 JPEGs, 35-min session" },
    { name: "Kid's Standard", price: "€200", details: "2 Outfits, 6 Edited + 6 JPEGs, 45-min session" },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <HeroContent />

      <section className="page-shell home-section mobile-who">
        <div className="note-on-childhood">
          <div className="note-copy">
            <span className="eyebrow">Who We Are</span>
            <h2 className="text-white mb-6">Every child is a story <br/>waiting to be told.</h2>
            <p>
              At Clicksandkids, our studio is a warm, welcoming space designed to let little personalities shine. 
              We pour heart into every frame to ensure each session is uniquely yours.
            </p>
            <Link href="/about" className="hero-link mt-8">READ OUR STORY —</Link>
          </div>
          <div className="note-image-wrap">
             <img src="/image/gallery/img-01.jpg"  alt="Studio Session" className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </section>

<section className="combine-section">
  <div className="combine-section-overlay"></div>
     <section className=" home-section">
       <WhyChooseUs />
     </section>

      <section id="pricing" className="page-shell home-section border-t border-white/10" style={{padding:"4% 8%",zIndex:2,position:"relative",borderTop:"1px solid #cfa77b"}}>
        <div className="section-header-flex">
          <div>
            <span className="eyebrow" >— Sessions & Pricing —</span>
            <h2 style={{color:"#fff"}}>Photography Packages</h2>
          </div>
          <Link href="/pricing" className="view-more-link">VIEW ALL PACKAGES —</Link>
        </div>
        <div className="plans-grid">
          {previewPackages.map((pkg) => (
            <div key={pkg.name} className="plan-card">
              <div>
                <span className="plan-name">{pkg.name}</span>
                <p className="plan-price">{pkg.price}</p>
                <p className="plan-details">{pkg.details}</p>
              </div>
              <Link href="/booking" className="primary-button w-full text-center">BOOK NOW</Link>
            </div>
          ))}
        </div>
      </section>
</section>
      <section className="page-shell home-section border-t border-white/5">
        <LatestWorks initialPhotos={allMedia} />
      </section>
      <section>
        <TestimonialSlider data={liveTestimonials} />
      </section>
<FAQSection />
      {/* FOOTER */}
     <Footer />
    </main>
  );
}