"use client";

import Link from "next/link";

const adminTools = [
  {
    title: "Media Library",
    desc: "Curate your gallery, upload new cinematic shots, and manage existing assets.",
    link: "/admin/manage",
    tag: "Gallery",
  },
  {
    title: "Client Stories",
    desc: "Manage testimonials and feedback. Approve stories to show them on the home page.",
    link: "/admin/testimonials",
    tag: "Social",
  },
  {
    title: "Booking Records",
    desc: "A digital ledger of every enquiry. Track names, dates, and session types.",
    link: "/admin/bookings",
    tag: "Leads",
  }
];

export default function AdminHub() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F8F7F5', // Soft off-white
      padding: "160px 7%",
      fontFamily: 'serif'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <header style={{ textAlign: "center", marginBottom: "80px" }}>
          <span style={{ 
            display: 'block', 
            letterSpacing: '0.3em', 
            textTransform: 'uppercase', 
            fontSize: '12px', 
            color: '#C8A988', 
            marginBottom: '10px' 
          }}>
            Management Console
          </span>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
            color: '#1a1a1a', 
            fontWeight: '400',
            fontStyle: 'italic'
          }}>
            Studio Hub
          </h1>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {adminTools.map((tool) => (
            <Link 
              href={tool.link} 
              key={tool.title} 
              style={{ 
                textDecoration: 'none',
                color: 'inherit',
                display: 'block'
              }}
            >
              <div className="glass-card" style={{ 
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '30px',
                padding: '40px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <span style={{ 
                      fontSize: '10px', 
                      letterSpacing: '2px', 
                      textTransform: 'uppercase', 
                      color: '#C8A988',
                      fontWeight: '600' 
                    }}>
                      {tool.tag}
                    </span>
                    <div style={{ 
                      width: '35px', 
                      height: '35px', 
                      borderRadius: '50%', 
                      border: '1px solid #e0e0e0', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '18px'
                    }}>
                      →
                    </div>
                  </div>

                  <h3 style={{ 
                    fontSize: '28px', 
                    marginBottom: '15px', 
                    color: '#1a1a1a',
                    fontWeight: '400' 
                  }}>
                    {tool.title}
                  </h3>
                  <p style={{ 
                    fontSize: '15px', 
                    lineHeight: '1.6', 
                    color: '#666', 
                    marginBottom: '30px',
                    fontFamily: 'sans-serif'
                  }}>
                    {tool.desc}
                  </p>
                </div>

                <div style={{ 
                  fontSize: '11px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '2px', 
                  fontWeight: '700',
                  color: '#1a1a1a'
                }}>
                  Open Tool —
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #C8A988;
        }
      `}</style>
    </main>
  );
}