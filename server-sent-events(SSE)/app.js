const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end("Hello");
});

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  sendStream(res);
});

let i = 0;

function sendStream(res) {
  if (i <= 10) {
    res.write("data: " + `hello from server --- ${i++}` + "\n\n");
    setTimeout(() => {
      sendStream(res);
    }, 1000);
  } else {
    res.end("Data Streaming Complete");
  }
}

app.listen(8080);

//Client-side code
// const sse = new EventSource('http://localhost:8080/stream');
// sse.onmessage = console.log
