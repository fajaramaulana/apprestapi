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
