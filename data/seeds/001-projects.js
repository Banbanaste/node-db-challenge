exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          name: "project 1",
          description: "a simple description of project 1"
        },
        { name: "project 2" },
        {
          name: "project 3",
          description: "a simple description  of project 3"
        }
      ]);
    });
};
