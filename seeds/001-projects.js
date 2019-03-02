exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          name: "Bankroll Challenge",
          description: "10k by end of baseball",
          is_complete: false
        }
      ]);
    });
};
