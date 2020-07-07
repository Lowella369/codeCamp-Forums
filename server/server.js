const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", function(request, response(){
  response.json('Get request received at /');
});

require("./app/routes/post-routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});