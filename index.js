const express = require("express");
const server = express();

const projects = [{ id: "1", title: "Estudando nodejs", task: [] }];
let numberRequest = 0;

server.use(express.json());

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(pjs => pjs.id === id);

  if (!project) {
    return res.status(400).json({ error: "Project not exist" });
  }

  return next();
}

function countRequest(req, res, next) {
  numberRequest++;

  console.log(`Número total de requisições feitas é de: ${numberRequest}`);

  return next();
}

server.use(countRequest);

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
