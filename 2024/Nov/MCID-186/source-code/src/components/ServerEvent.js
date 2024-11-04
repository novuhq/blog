import React, { useState, useEffect } from "react";

// const BaseURL = "http://localhost:8000";
function ServerEvents() {
  const [message, setMessage] = useState();

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4000/events");

    if (typeof EventSource !== "undefined") {
      eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        setMessage(eventData.message);
      };
    } else {
      console.log("EventSource is undefined");
    }

    return () => eventSource.close();
  }, []);

  const stocks = [
    { id: 1, ticker: "AAPL", price: 227.75 },
    { id: 2, ticker: "MSFT", price: 213.02 },
    { id: 3, ticker: "AMZN", price: 435.38 },
    { id: 4, ticker: "GOOGL", price: 163.6 },
  ];
  const formatPrice = (price) => {
    return new Intl.NumberFormat("us-EN", {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
    }).format(price);
  };
  return (
    <div>
      <div>
        <table>
          <caption>Stock Prices</caption>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Stock Symbol</th>
              <th>Real Time Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(({ id, ticker, price }, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{ticker}</td>
                <td>{formatPrice(price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className=" text-gray-800 text-xl font-bold mb-2 pt-6">{message}</h1>
    </div>
  );
}
export default ServerEvents;
