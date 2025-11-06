import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherModule() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/weather?city=London")
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load weather data.");
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return data ? (
    <div>
      <h3>Temperature: {data.temp}°C</h3>
      <p>Condition: {data.condition}</p>
    </div>
  ) : null;
}
export default WeatherModule;
