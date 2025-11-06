import { useState } from "react";
import styles from "./App.module.css";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator";

function App() {
  const [activeTab, setActiveTab] = useState("Weather");

  return (
    <div className={styles.container}>
      <h1 style={{ marginTop: "1.5rem", fontSize: "2rem", fontWeight: "700", color: "#4f46e5" }}>
        🌤️ InfoHub Dashboard
      </h1>

      <nav className={styles.nav}>
        <button
          onClick={() => setActiveTab("Weather")}
          style={{
            background:
              activeTab === "Weather"
                ? "linear-gradient(135deg, #6366f1, #a5b4fc)"
                : "",
          }}
        >
          Weather
        </button>
        <button
          onClick={() => setActiveTab("Currency")}
          style={{
            background:
              activeTab === "Currency"
                ? "linear-gradient(135deg, #6366f1, #a5b4fc)"
                : "",
          }}
        >
          Currency
        </button>
        <button
          onClick={() => setActiveTab("Quote")}
          style={{
            background:
              activeTab === "Quote"
                ? "linear-gradient(135deg, #6366f1, #a5b4fc)"
                : "",
          }}
        >
          Quote
        </button>
      </nav>

      <main className={styles.main}>
        {activeTab === "Weather" && <WeatherModule />}
        {activeTab === "Currency" && <CurrencyConverter />}
        {activeTab === "Quote" && <QuoteGenerator />}
      </main>

      <footer style={{ marginTop: "2rem", color: "#6b7280", fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} InfoHub | Built with ❤️ by Sravani
      </footer>
    </div>
  );
}

export default App;
