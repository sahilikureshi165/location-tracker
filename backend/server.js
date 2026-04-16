const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

// ✅ Schema (IST stored as STRING)
const LocationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  time: String, // 🔥 store IST as string
});

const Location = mongoose.model("locations", LocationSchema);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Location Tracker API Running");
});

// ✅ Save location (STORE IST)
app.post("/location", async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // 🔥 Convert to IST
    const istTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    }) + " IST";

    const newLocation = await Location.create({
      lat,
      lng,
      time: istTime
    });

    console.log("📍 Saved:", newLocation);

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all locations (already IST)
app.get("/locations", async (req, res) => {
  try {
    const data = await Location.find().sort({ _id: -1 });

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});