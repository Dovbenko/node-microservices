const express = require("express");

const app = express();
const morgan = require("morgan");
const routes = require("./routes");
const config = require("./config");

app.use(express.json());

app.use(morgan("tiny"));

app.use("/", routes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // You can also log the error to a file or console
  console.error(err);

  res.status(status).json({
    error: {
      message,
      status
    }
  });
});
module.exports = app;
