const express = require("express");
const helmet = require("helmet");

const db = require("./data/db-config.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/api/projects", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.post("/api/projects", (req, res) => {
  db("projects")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db("projects")
        .where({ id })
        .first()
        .then(project => {
          res.status(201).json(project);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.get("/api/tasks", (req, res) => {
  db("tasks")
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.post("/api/tasks", (req, res) => {
  db("tasks")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db("tasks")
        .where({ id })
        .first()
        .then(project => {
          res.status(201).json(project);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.get("/api/resources", (req, res) => {
  db("resources")
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

server.post("/api/resources", (req, res) => {
  db("resources")
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db("resources")
        .where({ id })
        .first()
        .then(project => {
          res.status(201).json(project);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* STRETCH PROBLEM */
server.get("/api/projects/:id", (req, res) => {
  const id = req.params.id;
  db("projects")
    .where({ id })
    .first()
    .then(project => {
      const project_id = project.id;
      db("tasks")
        .where({ project_id })
        .then(taskList => {
          return { ...project, tasks: [...taskList] };
        })
        .then(project => {
          const project_id = project.id;
          db("project_resources")
            .select("resource_id")
            .where({ project_id })
            .then(resourceList => {
              const resourceArray = resourceList.map(resource => {
                return resource.resource_id;
              });
              db("resources")
                .whereIn("id", resourceArray)
                .then(resourceList => {
                  res.status(200).json({
                    ...project,
                    resources: resourceList
                  });
                });
            });
        });
    });
});

module.exports = server;
