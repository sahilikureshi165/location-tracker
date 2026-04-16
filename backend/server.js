const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // 🔥 load env

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection using ENV
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

// Schema
const LocationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  time: { type: Date, default: Date.now },
});

const Location = mongoose.model("locations", LocationSchema);

// API to save location
app.post("/location", async (req, res) => {
  const { lat, lng } = req.body;

  if (lat === undefined || lng === undefined) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const newLocation = await Location.create({ lat, lng });

  console.log("📍 Saved:", newLocation);

  res.json({ success: true });
});

// 🔥 Use dynamic port (REQUIRED for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});