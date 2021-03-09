const conn = require("../connection");
const mysql = require("mysql");
const md5 = require("md5");
const response = require("../res");
const jwt = require("jsonwebtoken");
const config = require("../config/secret");
const ip = require("ip");
const nodemailer = require("nodemailer");
const secretEmail = require("./secret"); // not included for security reason

let smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: secretEmail.email,
    pass: secretEmail.pass,
  },
});

let rand, mailOptions, host, link;

exports.verification = function (req, res) {
  console.log(req.protocol);
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    if (req.query.id == rand) {
      conn.query(
        "UPDATE user SET isVerified=? WHERE email=?",
        [1, mailOptions.to],
        function (err, rows, fileds) {
          if (err) {
            console.log(err);
            res.end(error);
          } else {
            res.end(
              `<h1>email anda ${mailOptions.to} telah terverifikasi</h1>`
            );
          }
        }
      );
    } else {
      res.end(`<h1>email anda ${mailOptions.to} tidak terverifikasi</h1>`);
    }
  }
};

// reqister controller
exports.register = function (req, res) {
  let post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: 3,
    created_at: new Date(),
    isVerified: 0,
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
            rand = Math.floor(Math.random() * 100 + 54);
            host = "localhost:3001";
            link = "http://" + host + "/auth/verify?id=" + rand;
            mailOptions = {
              from: '"Admin Verifikasi" <fajar@fajarr.com>',
              to: post.email,
              subject: "Verifikasi pendaftaran akun",
              text: "Please verify your account now!", // plain text body
              html: `Hallo, <br> Please klik tautan verifikasi berikut <br>
              <a href="${link}">Click here to verifikasi</a>`,
            };

            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                res
                  .json({
                    success: false,
                    isRegistered: false,
                    message: "Verification email failed to send",
                  })
                  .end();
              } else {
                res
                  .json({
                    success: true,
                    isRegistered: false,
                    message:
                      "The verification email has been sent successfully to your email",
                  })
                  .end();
              }
            });
          }
        });
      } else {
        res
          .json({
            success: false,
            isRegistered: true,
            message: "The email is already registered",
          })
          .end();
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
          expiresIn: 10000,
        });
        id_user = rows[0].id;
        username = rows[0].username;
        role = rows[0].role;
        let expired = 10000;
        let isVerified = rows[0].isVerified;
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
              expires: expired,
              currUser: data.id_user,
              user: username,
              role: role,
              isVerified: isVerified,
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

exports.adminMahasiswa = function (req, res) {
  conn.query("SELECT * FROM mahasiswa", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
