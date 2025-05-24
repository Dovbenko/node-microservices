#!/usr/bin/env node

const config = require("../config");

const axios = require("axios");

const http = require("http");

const connectToMongoose = require("../lib/mongooseConnection"); // Function to connect to MongoDB

const app = require("../app");

const server = http.createServer(app);

server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

  const register = async () =>
    axios
      .put(
        `http://127.0.0.1:3080/register/${config.serviceName}/${
          config.serviceVersion
        }/${server.address().port}`
      )
      .catch((err) => console.error(err));

  const unregister = async () =>
    axios
      .delete(
        `http://127.0.0.1:3080/register/${config.serviceName}/${
          config.serviceVersion
        }/${server.address().port}`
      )
      .catch((err) => console.error(err));

  register();
  const interval = setInterval(register, 10000);

  const cleanup = async () => {
    const clean = false;
    if (!clean) {
      clearInterval(interval);
      await unregister();
    }
  };

  process.on("uncaughtException", async () => {
    await cleanup();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await cleanup();
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    await cleanup();
    process.exit(0);
  });

  console.info(
    `${config.serviceName}:${config.serviceVersion} listening on ${bind}`
  );
});

connectToMongoose(config.mongodb.url).then(() => {
  server.listen(0);
});
