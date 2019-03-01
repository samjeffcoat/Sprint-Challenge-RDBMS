const router = require("express").Router();

const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

router.post("/", (req, res) => {
  db("actions")
    .insert(req.body)
    .then(([id]) => {
      db("actions")
        .where({ id })
        .first()
        .then(mamabear => {
          res.status(200).json(mamabear);
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = router;
