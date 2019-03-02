exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", function(tbl) {
    tbl.increments("id");
    tbl.string("description", 256).notNullable();
    tbl.text("notes").notNullable();
    tbl.boolean("is_complete").defaultTo(false);
    tbl.integer("project_id").unsigned();
    tbl.foreign("project_id").references("projects.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};
