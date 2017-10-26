var knex = require("./knex");

function Shows() {
  return knex("shows");
}

// *** queries *** //

function getAll() {
  return Shows().select();
}

function getSingle(showID) {
  return Shows()
    .where("id", parseInt(showID))
    .first();
}

function addShow(show) {
  return Shows().insert(show, "id");
}

function updateShow(showID, updates) {
  return Shows()
    .where("id", parseInt(showID))
    .update(updates);
}

module.exports = {
  getAll,
  getSingle,
  addShow,
  updateShow
};
