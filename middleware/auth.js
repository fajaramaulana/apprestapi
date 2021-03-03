let conn = require("../connection");
let mysql = require("mysql");
let md5 = require("md5");
let response = require("../res");
let jwt = require("jsonwebtoken");
let config = require("../config/secret");
let ip = require("ip");

// reqister controller
exports.register = function (req, res) {
  let post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    created_at: new Date(),
  };

  let checkEmail = "SELECT email FROM ?? WHERE ??=?";
  let table = ["user", "email", post.email];

  checkEmail = mysql.format(checkEmail, table);

  conn.query(checkEmail, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      if (rows.length == 0) {
        let insert = "INSERT INTO ?? SET ?";
        table = ["user"];
        insert = mysql.format(insert, table);
        conn.query(insert, post, function (err, rows) {
          if (err) {
            console.log(err);
          } else {
            response.ok("Insert new user data success", res);
          }
        });
      } else {
        response.ok("Email Already Created!", res);
      }
    }
  });
};

// login controller
exports.login = function (req, res) {
  let post = {
    email: req.body.email,
    password: req.body.password,
  };

  let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  let table = ["user", "email", post.email, "password", md5(post.password)];
  query = mysql.format(query, table);

  conn.query(query, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      if (rows.length == 1) {
        let token = jwt.sign({ rows }, config.secret, {
          expiresIn: 1500,
        });
        id_user = rows[0].id;
        let data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address(),
        };

        let query = "INSERT INTO ?? SET ?";
        let table = ["access_token"];

        insertAccessToken = mysql.format(query, table);
        conn.query(insertAccessToken, data, function (err, rows) {
          if (err) {
            console.log(err);
          } else {
            res.json({
              success: true,
              message: "JWT has been created",
              token: token,
              currUser: data.id_user,
            });
          }
        });
      } else {
        res.json({ Error: true, Message: "Email or Password Incorrect" });
      }
    }
  });
};

exports.secretPage = function (req, res) {
  response.ok("This page only for user with role 2", res);
};
