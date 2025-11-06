import React, { useState } from "react";
import axios from "axios";

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = () => {
    setIsLoading(true);
    axios.get(`/api/currency?amount=${amount}`)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Conversion failed!");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount in INR"
      />
      <button onClick={handleConvert}>Convert</button>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && (
        <div>
          <p>USD: {data.usd}</p>
          <p>EUR: {data.eur}</p>
        </div>
      )}
    </div>
  );
}
export default CurrencyConverter;
