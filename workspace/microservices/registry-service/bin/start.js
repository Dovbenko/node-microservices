#!/usr/bin/env node

// Configuration settings
const config = require("../config");

const http = require("http");

const app = require("../app");

// Create the HTTP server with the express app
const server = http.createServer(app);

// Attach error and listening handlers to the server
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(
    `${config.serviceName}:${config.serviceVersion} listening on ${bind}`
  );
});

// Start the server
server.listen(3080);
