var express = require('express');
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require("cors");
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response){
  response.json('Get request received at /');
});

require('./app/routes/forums-routes.js')(app);
app.listen(PORT, function(){
  console.log('Server is running on port ' + PORT);
});