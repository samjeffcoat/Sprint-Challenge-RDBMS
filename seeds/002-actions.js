exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          project_id: 1,
          description: "Complete BR Challenge",
          notes: "Track Results, Profit",
          is_complete: false
        }
      ]);
    });
};
