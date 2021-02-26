"use strict";
module.exports = function (app) {
  var myJson = require("./controller");

  app.route("/").get(myJson.index);
  app.route("/show").get(myJson.showAllMahasiswa);
  app.route("/show/:id").get(myJson.showMahasiswaById);
};
