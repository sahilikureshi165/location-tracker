const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Allow all origins (Vercel frontend)
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
  time: { type: Date, default: Date.now },
});

const Location = mongoose.model("locations", LocationSchema);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("🚀 Location Tracker API is running");
});

// ✅ Save Location
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

// ✅ Get Locations (IST Time)
app.get("/locations", async (req, res) => {
  try {
    const data = await Location.find().sort({ time: -1 });

    const formatted = data.map(item => ({
      lat: item.lat,
      lng: item.lng,
      time: new Date(item.time).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short"
      }) + " IST"
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

// ✅ Port (Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});