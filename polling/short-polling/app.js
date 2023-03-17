const express = require("express");

const app = express();

const jobs = {};

app.post("/task", (req, res) => {
  const jobId = `${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId, 0);
  res.end("\n\n" + jobId + "\n\n");
});

app.get("/checkstatus", (req, res) => {
  const { id } = req.query;
  const status = jobs[id];
  res.end("\n\n" + `Status of ${id} is ${status}` + "\n\n");
});

app.listen(8080, () => {
  console.log("Listening on Port 8080");
});

function updateJob(id, progress) {
  jobs[id] = progress;
  console.log(`${id} progess is ${progress}`);
  if (jobs[id] === 100) return;
  setTimeout(() => {
    updateJob(id, progress + 10);
  }, 3000);
}
