const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/restaurantBooking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const bookingSchema = new mongoose.Schema({
  name: String,
  contact: String,
  date: String,
  time: String,
  guests: Number,
  tableNumber: Number, // Assign table number
});

const Booking = mongoose.model("Booking", bookingSchema);

app.post("/create-booking", async (req, res) => {
  const { name, contact, date, time, guests } = req.body;

  try {
    const existingBookings = await Booking.find({ date, time });

    const bookedTables = existingBookings.map((booking) => booking.tableNumber);
    let availableTable = null;

    for (let i = 1; i <= 10; i++) {
      if (!bookedTables.includes(i)) {
        availableTable = i;
        break;
      }
    }

    if (!availableTable) {
      return res.status(400).json({ message: "No tables available at this time." });
    }

    const newBooking = new Booking({
      name,
      contact,
      date,
      time,
      guests,
      tableNumber: availableTable,
    });

    await newBooking.save();
    res.status(200).json({ message: "Booking successful!", tableNumber: availableTable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/get-bookings", async (req, res) => {
  const { date } = req.query; // Get the date from query params
  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    const bookings = await Booking.find({ date }); // Filter by the provided date
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});


// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
