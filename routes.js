"use strict";
module.exports = function (app) {
  let myJson = require("./controller");

  app.route("/").get(myJson.index);
  app.route("/show").get(myJson.showAllMahasiswa);
  app.route("/show/:id").get(myJson.showMahasiswaById);
  app.route("/add").post(myJson.addMahasiswa);
  app.route("/edit").put(myJson.editMahasiswa);
};
