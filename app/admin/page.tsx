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
    <main className="min-h-screen bg-[#0A0A0A] pt-40 pb-20 px-6" style={{padding:"160px 7%"}}>
      <div className="max-w-6xl mx-auto">
           <div className="mb-10">
  
</div>
        <header className="mb-20" style={{textAlign:"center",marginBottom:"50px"}}>
          <span className="eyebrow !text-[#C8A988] !mb-4">Management Console</span>
          <h1 className="text-white font-serif text-6xl italic">Studio Hub</h1>
        </header>

        <div className="admin-hub-grid">
          {adminTools.map((tool) => (
            <Link href={tool.link} key={tool.title} className="hub-card-modern">
              <div className="hub-card-top">
                <span className="hub-tag">{tool.tag}</span>
                <div className="hub-icon-circle">→</div>
              </div>
              <div className="hub-card-body">
                <h3>{tool.title}</h3>
                <p>{tool.desc}</p>
              </div>
              <div className="hub-card-footer">
                <span>Open Tool —</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}