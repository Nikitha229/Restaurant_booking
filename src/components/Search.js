import React, { useState } from "react";

const Search = () => {
  const [searchDate, setSearchDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("");
    setBookings([]);

    if (!searchDate) {
      setMessage("Please select a date.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/get-bookings?date=${searchDate}`);
      const data = await response.json();

      if (response.ok) {
        if (data.length > 0) {
          setBookings(data);
        } else {
          setMessage("No bookings found for the selected date.");
        }
      } else {
        setMessage(data.message || "Failed to fetch bookings.");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Search Bookings</h2>
      <form onSubmit={handleSearch} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date:</label>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}

      {bookings.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Contact</th>
              <th style={styles.tableHeader}>Date</th>
              <th style={styles.tableHeader}>Time</th>
              <th style={styles.tableHeader}>Guests</th>
              <th style={styles.tableHeader}>Table Number</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>{booking.name}</td>
                <td style={styles.tableCell}>{booking.contact}</td>
                <td style={styles.tableCell}>{booking.date}</td>
                <td style={styles.tableCell}>{booking.time}</td>
                <td style={styles.tableCell}>{booking.guests}</td>
                <td style={styles.tableCell}>{booking.tableNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    fontSize: "16px",
    color: "red",
  },
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  },
  tableHeader: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  tableRow: {
    backgroundColor: "#f8f9fa",
  },
  tableCell: {
    color:"black",
    padding: "10px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
};

export default Search;
