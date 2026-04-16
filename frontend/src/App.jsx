import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("Click to detect location");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setMsg("❌ Not supported");
      return;
    }

    setMsg("📡 Getting location...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setMsg(`📍 Lat: ${lat}, Lng: ${lng}`);

        // 🔥 SEND TO BACKEND
        await fetch("http://localhost:5000/location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lat, lng }),
        });
      },
      () => {
        setMsg("❌ Permission denied");
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🌍 Real Location Tracker</h1>

      <button onClick={getLocation}>
        Get My Location
      </button>

      <p>{msg}</p>
    </div>
  );
}

export default App;