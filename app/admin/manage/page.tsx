import type { Metadata } from "next";
import Link from "next/link";
import ManageMediaGrid from "../../../components/ManageMediaGrid";
import { getPhotos } from "../../../lib/photos";

export const metadata: Metadata = {
  title: "Admin Manage — Clicksandkids",
  description: "Library management portal.",
};

export default async function ManagePage() {
  // Security is handled by the parent layout.tsx
  const mediaList = await getPhotos();

   return (
  <main className="min-h-screen bg-[#fff] pt-32 pb-20 " style={{padding:"160px 0 0"}}>
       <div className="mb-10">
  <Link href="/admin" className="text-white/30 hover:text-[#C8A988] transition-colors text-[10px] tracking-[3px] uppercase">
    ← Back to Hub
  </Link>
</div>
  <div className="max-w-[1400px] mx-auto px-6 manage-glass-card" style={{alignContent: "center",textAlign: "center"}}>
    <section className="mb-16 border-b border-white/5 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div>
        <span className="eyebrow !text-[#C8A988]">Archive</span>
        <h1 className="text-white font-serif text-5xl md:text-6xl mt-4 italic">Library Manager</h1>
        <p className="text-white/40 mt-4 max-w-md text-sm leading-relaxed uppercase tracking-widest">
          Review live assets. Deleting items here will remove them from the database and Cloudinary storage.
        </p>
      </div>
  
    </section>
       <div className="admin-nav-bar" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
  <Link href="/admin/upload" className="secondary-button" style={{ padding: '10px 30px' }}>
   + Add New Asset
  </Link>
</div>


    <ManageMediaGrid initialItems={mediaList} />
  </div>
</main>
);
}