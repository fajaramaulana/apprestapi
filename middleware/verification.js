const jwt = require("jsonwebtoken");
const config = require("../config/secret");

function verification(role) {
  return function (req, rest, next) {
    // let role = req.body.role;
    // check authorization header
    let tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      let token = tokenWithBearer.split(" ")[1];
      //verification
      jwt.verify(token, config.secret, function (err, rows) {
        if (err) {
          return rest
            .status(401)
            .send({ auth: false, message: "Token didnt registered" });
        } else {
          if (role == 1) {
            req.auth = rows;
            next();
          } else {
            return rest.status(401).send({
              auth: false,
              message: "Failed to authorization your role",
            });
          }
        }
      });
    } else {
      return rest
        .status(401)
        .send({ auth: false, message: "Token not available!" });
    }
  };
}

module.exports = verification;
