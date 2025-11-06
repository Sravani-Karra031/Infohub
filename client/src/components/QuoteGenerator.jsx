import React, { useState, useEffect } from "react";
import axios from "axios";

function QuoteGenerator() {
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuote = () => {
    setIsLoading(true);
    axios.get("/api/quote")
      .then(res => {
        setQuote(res.data.quote);
        setIsLoading(false);
      })
      .catch(() => {
        setQuote("Failed to fetch quote.");
        setIsLoading(false);
      });
  };

  useEffect(() => { fetchQuote(); }, []);

  return (
    <div>
      <p>{isLoading ? "Loading..." : quote}</p>
      <button onClick={fetchQuote}>Get New Quote</button>
    </div>
  );
}
export default QuoteGenerator;
