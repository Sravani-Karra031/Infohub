const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

// ✅ Health check route (optional)
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// ✅ Quotes API (no key required)
const quotes = [
  "Stay positive!",
  "Keep moving forward.",
  "Success is no accident.",
  "Believe in yourself.",
  "Dream big and work hard."
];

app.get("/api/quote", (req, res) => {
  const random = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[random] });
});

// ✅ Weather API (uses OPENWEATHER_API from .env)
app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "London";
    const apiKey = process.env.OPENWEATHER_API;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing OpenWeather API key." });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const { temp } = response.data.main;
    const condition = response.data.weather[0].description;
    res.json({ temp, condition });
  } catch (error) {
    console.error("Weather API error:", error.message);
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

// ✅ Currency API (uses EXCHANGE_API from .env)
app.get("/api/currency", async (req, res) => {
  try {
    const { amount } = req.query;
    const exchangeApi = process.env.EXCHANGE_API;

    if (!exchangeApi) {
      return res.status(500).json({ error: "Missing ExchangeRate API URL." });
    }

    const resp = await axios.get(exchangeApi);

    const inrRate = resp.data.conversion_rates.INR;
    const eurRate = resp.data.conversion_rates.EUR;

    const amountNum = parseFloat(amount) || 1;

    // Convert INR → USD → EUR
    const usd = (amountNum / inrRate).toFixed(2);
    const eur = (usd * eurRate).toFixed(2);

    res.json({ usd, eur });
  } catch (error) {
    console.error("Currency API error:", error.message);
    res.status(500).json({ error: "Currency conversion failed." });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
