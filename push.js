const http = require("http");
const WebSocketServer = require("websocket").server;

let connections = [];

const httpServer = http.createServer();

const websocket = new WebSocketServer({ httpServer: httpServer });

httpServer.listen(8080, () => {
  console.log("Listening on port 8080");
});
