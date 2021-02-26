"use strict";

let response = require("./res");
let connection = require("./connection");

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

// add mahasiswa data
exports.addMahasiswa = function (req, res) {
  let nim = req.body.nim;
  let nama = req.body.nama;
  let prodi = req.body.prodi;

  connection.query(
    "INSERT INTO mahasiswa (nim,nama,prodi) VALUES (?,?,?)",
    [nim, nama, prodi],
    function (err, rows, fileds) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Success Insert data", res);
      }
    }
  );
};

// edit mahasiswa data by id
exports.editMahasiswa = function (req, res) {
  let id = req.body.id;
  let nim = req.body.nim;
  let nama = req.body.nama;
  let prodi = req.body.prodi;

  connection.query(
    "UPDATE mahasiswa SET nim=?, nama=?, prodi=? WHERE id=?",
    [nim, nama, prodi, id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Success Edit Data", res);
      }
    }
  );
};

// delete mahasiswa data by id
exports.deleteMahasiswa = function (req, res) {
  let id = req.body.id;

  connection.query(
    "DELETE FROM mahasiswa WHERE id=?",
    [id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Success Delete Data", res);
      }
    }
  );
};
