const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

// ✅ Schema
const LocationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  time: { type: Date, default: Date.now }, // stored in UTC
});

const Location = mongoose.model("locations", LocationSchema);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 API Running");
});

// ✅ Save location
app.post("/location", async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ message: "Invalid data" });
    }

    await Location.create({ lat, lng });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET locations with IST conversion
app.get("/locations", async (req, res) => {
  try {
    const data = await Location.find().sort({ time: -1 });

    const formatted = data.map(item => ({
      lat: item.lat,
      lng: item.lng,

      // 🔥 IST TIME FORMAT
      time: new Date(item.time).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }) + " IST"
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});