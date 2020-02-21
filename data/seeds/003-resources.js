exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("resources")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("resources").insert([
        { name: "item", description: "a simple description" },
        { name: "whitboard", description: "a simple description" },
        { name: "computer", description: "a simple description" },
        { name: "board room", description: null }
      ]);
    });
};
