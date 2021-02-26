"use strict";

var response = require("./res");
var connection = require("./connection");

exports.index = function (req, res) {
  response.ok("REST API RUNNING !", res);
};

// show all data mahasiswa
exports.showAllMahasiswa = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (err, rows, fields) {
    if (err) {
      connection.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
