exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", table);
};

exports.down = function(knex, Promise) {};
