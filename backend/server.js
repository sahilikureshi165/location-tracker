const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://sahil:sahil@cluster0.di1etda.mongodb.net/locationDB?retryWrites=true&w=majority")
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

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});