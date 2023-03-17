const express = require("express");

const app = express();

const jobs = {};

app.post("/task", (req, res) => {
  const jobId = `${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId, 0);
  res.end("\n\n" + `JobID : ${jobId}` + "\n\n");
});

app.get("/checkstatus", async (req, res) => {
  const { id } = req.query;

  while ((await checkJobComplete(id)) == false);
  res.end(`${id} Job Status Complete : ${jobs[id]}%`);
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});

function checkJobComplete(id) {
  return new Promise((res, rej) => {
    if (jobs[id] < 100) {
      setTimeout(() => {
        res(false);
      }, 1000);
    } else {
      res(true);
    }
  });
}

function updateJob(id, prog) {
  jobs[id] = prog;
  console.log(`${id} Progress is ${jobs[id]}%`);
  if (jobs[id] === 100) return;
  setTimeout(() => {
    updateJob(id, prog + 10);
  }, 3000);
}
