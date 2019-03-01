const router = require("express").Router();

const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

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
module.exports = router;
