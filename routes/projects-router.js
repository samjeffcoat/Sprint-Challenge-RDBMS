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

module.exports = router;
