const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;
const corsOPtions = {
  origin: "http://localhost:3000",
};

app.get("/events", cors(corsOPtions), (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
  });

  setInterval(() => {
    const data = {
      message: `Stocks prices was updated on - ${new Date()}`,
    };

    res.write(`data:  ${JSON.stringify(data)}\n\n`);
  }, 5000);
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
