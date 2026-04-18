import type { Metadata } from "next";
import Link from "next/link";
import UploadZone from "../../../components/UploadZone";

export const metadata: Metadata = {
  title: "Admin Upload — Clicksandkids",
  description: "Secure imagery upload portal.",
};

export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export default function UploadPage() {
  return (
   <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20" style={{padding:"160px 0 0"}}>
  <div className="max-w-[1200px] mx-auto px-6">
    <section className="mb-16 border-b border-white/5 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6" style={{alignContent: "center",textAlign: "center"}}>
      <div>
        <span className="eyebrow !text-[#C8A988]">Studio Control</span>
        <h1 className="text-white font-serif text-5xl md:text-6xl mt-4 italic">Upload Imagery</h1>
        <p className="text-white/40 mt-4 max-w-md text-sm leading-relaxed uppercase tracking-widest">
          Sync new cinematic moments to Cloudinary and update the live collection instantly.
        </p>
      </div>
      <div className="admin-nav-bar" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
  <Link href="/admin/manage" className="secondary-button" style={{ padding: '10px 30px' }}>
    Go to Manage Media
  </Link>
</div>
    </section>

    <div className="upload-zone-wrapper">
       <UploadZone />
    </div>
  </div>
</main>
  );
}