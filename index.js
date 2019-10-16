const express = require("express");
const server = express();

const projects = [{ id: "1", title: "Estudando nodejs", task: [] }];

server.use(express.json());

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(pjs => pjs.id === id);

  if (!project) {
    return res.status(400).send({ error: "Project not exist" });
  }

  return next();
}

function applicationsLogs(req, res, next) {
  const { url, method } = req;
  const end = res.end;

  const data = {
    index: {
      method,
      url
    }
  };

  res.end = function(chunk, encoding) {
    data.index.statusCode = res.statusCode;

    console.time("request");
    console.group("Total Requests");
    console.count("Total number of requests made is");
    console.groupEnd();
    console.table(data);
    console.timeEnd("request");

    res.end = end;
    res.end(chunk, encoding);
  };

  return next();
}

server.use(applicationsLogs);

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    task: []
  };

  projects.push(project);
  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(pjs => pjs.id === id);
  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectId = projects.findIndex(pjs => pjs.id === id);

  projects.splice(projectId, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(pjs => pjs.id === id);

  project.task.push(title);

  return res.json(project);
});

server.listen(3000);
