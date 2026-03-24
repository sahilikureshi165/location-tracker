
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
}));
app.use(express.json());

mongoose.connect("mongodb+srv://jekov13174_db_user:IOnXnP5GbNY33LR9@cluster0.sqjwheo.mongodb.net/locationDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(" MongoDB Error:", err));

const LocationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Location = mongoose.model("Location", LocationSchema);


app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});
app.post("/location", async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);

    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Invalid location data",
      });
    }

    const newLocation = await Location.create({ lat, lng });

    console.log(" Saved:", newLocation);

    res.status(200).json({
      success: true,
      message: "Location saved successfully",
      data: newLocation,
    });

  } catch (error) {
    console.log(" Server Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.get("/locations", async (req, res) => {
  try {
    const locations = await Location.find().sort({ time: -1 });

    res.json({
      success: true,
      data: locations,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching locations",
    });
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});