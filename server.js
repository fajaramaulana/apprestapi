const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// call routes
let routes = require("./routes");
routes(app);

// register menu routes from middleware/index.js
app.use("/auth", require("./middleware"));

app.listen(3001, () => {
  console.log(`Server started on port 3001`);
});
