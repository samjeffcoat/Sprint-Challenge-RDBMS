const router = require("express").Router();

const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);
// Post a project
router.post("/", (req, res) => {
  db("projects")
    .insert(req.body)
    .then(([id]) => {
      db("projects")
        .where({ id })
        .first()
        .then(bigbear => {
          res.status(200).json(bigbear);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// Get a project
router.get("/", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get projects by Id

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("projects")
    .where("projects.id", id)
    .then(project => {
      const newProject = project[0];
      db("actions")
        .select(
          "actions.id",
          "actions.description",
          "actions.notes",
          "actions.is_complete",
          "actions.project_id"
        )
        .where("actions.project_id", id)
        .then(actions => {
          if (!newProject) {
            res
              .status(404)
              .json({ err: "A Project with that id cannot be found" });
          } else {
            res.json({
              id: newProject.id,
              name: newProject.name,
              description: newProject.description,
              is_complete: newProject.is_complete,
              actions: actions
            });
          }
        });
    })
    .catch(() => {
      res
        .status(404)
        .json({ error: "Info about that project cannot be retrieved" });
    });
});

module.exports = router;
