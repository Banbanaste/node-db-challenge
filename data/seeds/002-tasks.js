exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          description: "a simple description of a task on project 1",
          notes: "a simple note",
          completed: false,
          project_id: 1
        },
        {
          description: "a simple description of a task  on project 1",
          notes: null,
          completed: false,
          project_id: 1
        },
        {
          description: "a simple description of s task  on project 2",
          notes: "a simple note",
          completed: false,
          project_id: 2
        }
      ]);
    });
};
