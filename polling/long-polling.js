const express = require("express");

const app = express();

const jobs = {};

app.post("/task", (req, res) => {
  const jobId = `${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId);
  res.end("\n\n" + jobId + "\n\n");
});

app.get("/checkstatus", async (req, res) => {
  const { id } = req.query;

  while ((await checkJobComplete(id)) == false);
  res.end(`${id} Job Status Complete : ${jobs[id]}`);
});
