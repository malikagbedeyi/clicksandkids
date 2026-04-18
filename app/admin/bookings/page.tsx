import Link from "next/link";
import { prisma } from "../../../lib/db";

export default async function BookingRecords() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="admin-manage-page">
      <div className="manage-media-shell !max-w-6xl">
           <div className="mb-10">
  <Link href="/admin" className="text-white/30 hover:text-[#C8A988] transition-colors text-[10px] tracking-[3px] uppercase">
    ← Back to Hub
  </Link>
</div>
        <div className="mb-16">
          <p className="eyebrow !text-[#C8A988]">Business Ledger</p>
          <h1 className="text-white font-serif text-5xl mt-2 italic" style={{marginBottom:"30px"}}>Booking Records</h1>
        </div>

        <div className="booking-table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Date Received</th>
                <th>Client</th>
                <th>Session</th>
                <th>Requested Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="date-col">{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="client-cell">
                      <span className="name">{b.name}</span>
                      <span className="email">{b.email}</span>
                    </div>
                  </td>
                  <td><span className="package-badge">{b.sessionType}</span></td>
                  <td>{b.preferredDate}</td>
                  <td>
                    <button className="view-details-btn" title={b.message || "No notes"}>
                      Note
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && (
            <div className="py-20 text-center opacity-20 uppercase tracking-[4px]">No bookings found</div>
          )}
        </div>
      </div>
    </main>
  );
}