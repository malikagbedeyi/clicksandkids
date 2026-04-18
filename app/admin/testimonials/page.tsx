import Link from "next/link";
import { getAllTestimonials, toggleApproval } from "../../../lib/testimonials";

export default async function ManageTestimonials() {
  const reviews = await getAllTestimonials();

  return (
    <main className="admin-manage-page">
      <div className="manage-media-shell !max-w-4xl">
           <div className="mb-10">
  <Link href="/admin" className="text-white/30 hover:text-[#C8A988] transition-colors text-[10px] tracking-[3px] uppercase">
    ← Back to Hub
  </Link>
</div>
        <div className="mb-16 text-center">
          <p className="eyebrow !text-[#C8A988]">Studio Feedback</p>
          <h1 className="text-white font-serif text-5xl mt-2 italic">Client Stories</h1>
        </div>

        <div className="testimonial-admin-list">
          {reviews.length === 0 ? (
            <p className="text-white/20 text-center py-20 uppercase tracking-widest">No reviews submitted yet.</p>
          ) : (
            reviews.map((rev: any) => (
              <div key={rev.id} className="testimonial-admin-card">
                {/* Status Badge */}
                <div className={`status-badge ${rev.approved ? 'is-live' : 'is-pending'}`}>
                  {rev.approved ? 'Live on Site' : 'Pending Approval'}
                </div>

                <div className="testimonial-admin-content">
                  <div className="client-info">
                    <h3>{rev.name}</h3>
                    <span className="session-tag">{rev.session}</span>
                  </div>
                  
                  <blockquote className="client-text">
                    "{rev.content}"
                  </blockquote>

                  <div className="testimonial-admin-actions">
                    <form action={async () => { "use server"; await toggleApproval(rev.id, rev.approved); }}>
                      <button className={`approve-toggle-btn ${rev.approved ? 'btn-live' : 'btn-approve'}`}>
                        {rev.approved ? 'Take Offline' : 'Approve & Publish'}
                      </button>
                    </form>
                    <p className="date-stamp">{new Date(rev.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}