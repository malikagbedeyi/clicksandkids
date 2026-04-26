import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "About — Clicksandkids Photography",
  description: "Meet Ebun Adeleye, the heart and soul behind Clicksandkids Photography in Dublin & Drogheda.",
};

export default function AboutPage() {
  return (
    <>
    <main className="about-split-layout">
      <aside className="sticky-side">
        <Image
          src="/image/gallery/img-01.jpg" 
          alt="Ebun Adeleye - Photographer & Founder"
          width={1200}
          height={1800}
          className="split-image"
          priority
        />
      </aside>

      {/* RIGHT SIDE: SCROLLING CONTENT */}
      <section className="content-side">
        <span className="eyebrow">— Who We Are —</span>
        <h1 className="about-title">Every child is a story waiting to be told.</h1>
        <div className="about-text">
          <p className="mb-6">
            At Clicksandkids, we believe childhood is a collection of fleeting, magical moments. 
            Our studio is a warm, welcoming space designed to let little personalities shine. 
            Whether it's your baby's first cake smash, a maternity glow, or a lively family portrait, 
            we pour heart into every frame.
          </p>
          <p>
            We work with a variety of beautifully curated backdrops — from classic plain and themed sets 
            to stunning African Trad builds — ensuring each session is uniquely yours. 
            Every edited image is professionally colour-graded and delivered within 7 working days.
          </p>
        </div>

        <section className="philosophy-section">
          <span className="eyebrow">— Meet Your Photographer —</span>
          <h2 className="text-4xl font-serif mt-4 text-white">Ebun Adeleye</h2>
          <p className="text-[#C8A988] uppercase tracking-[3px] text-xs mt-2 font-bold">
            Photographer & Founder of Clicksandkids
          </p>

          <blockquote className="pull-quote">
            “My journey began the moment I became a mum. I realized just how quickly the tiny, magical moments slip by.”
          </blockquote>

          <div className="about-text">
            <h3 className="text-white uppercase tracking-[4px] text-xs mb-6 font-bold">My Story</h3>
            <p className="mb-6">
              I picked up my camera determined to hold onto every first giggle and wobbly step. 
              What started as a passion for preserving my own family's memories quickly grew into a calling: 
              capturing those same fleeting moments for other families — the chaos, the laughter, the love.
            </p>
            <p>
              My background in **Law** means I bring an eye for detail to everything I do — 
              noticing the little things that make a great photo truly special. My goal is to create 
              a relaxed, fun experience where your family can just be yourselves.
            </p>
          </div>

          <div className="about-grid">
            <div>
              <h3>Professional Craft</h3>
              <p className="text-sm leading-relaxed opacity-60">
                We do not share raw images — only the very best of your session, 
                carefully retouched to editorial standards.
              </p>
            </div>
            <div>
              <h3>Milestone Experts</h3>
              <p className="text-sm leading-relaxed opacity-60">
                Specialists in Cake Smash, Maternity, and African Traditional builds. 
                We handle the details so you can enjoy the moment.
              </p>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <div className="mt-20 pt-10 border-t border-white/5">
          <p className="font-serif text-2xl text-white italic">
            Every childhood moment is fleeting — let me help you hold onto it forever.
          </p>
        </div>
      </section>
    </main>
    {/* <Footer /> */}
    </>
  );
}