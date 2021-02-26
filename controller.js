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
      console.log(err);
    } else {
      response.ok(rows, res);
    }
  });
};

// show all mahasiswa data by id

exports.showMahasiswaById = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM mahasiswa WHERE id = ?",
    [id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
