import React from "react";

export default function BookingList({ bookings }) {
  return (
    <div>
      <h3>Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings available</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <p>
              {b.name} - {b.date} at {b.time} ({b.guests} guests)
            </p>
          </div>
        ))
      )}
    </div>
  );
}
