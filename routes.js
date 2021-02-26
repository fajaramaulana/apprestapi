"use strict";
module.exports = function (app) {
  let myJson = require("./controller");

  app.route("/").get(myJson.index);
  app.route("/mahasiswa/show").get(myJson.showAllMahasiswa);
  app.route("/mahasiswa/show/:id").get(myJson.showMahasiswaById);
  app.route("/mahasiswa/add").post(myJson.addMahasiswa);
  app.route("/mahasiswa/edit").put(myJson.editMahasiswa);
  app.route("/mahasiswa/delete").delete(myJson.deleteMahasiswa);
};
