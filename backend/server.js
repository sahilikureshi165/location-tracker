const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS (allow frontend)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ MongoDB connection
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


// ✅ ROOT ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("🚀 Location Tracker API is running");
});


// ✅ SAVE LOCATION
app.post("/location", async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const newLocation = await Location.create({ lat, lng });

    console.log("📍 Saved:", newLocation);

    res.json({ success: true });

  } catch (err) {
    console.error("Error saving location:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ GET ALL LOCATIONS (VERY IMPORTANT)
app.get("/locations", async (req, res) => {
  try {
    const data = await Location.find().sort({ time: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});


// ✅ PORT (Render compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});