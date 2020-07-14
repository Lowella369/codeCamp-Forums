const Users = require('../models/user.js');

// Create and Save a new User
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Data should not be empty!'
    });
  }

  const user  = new Users({
    userFName: req.body.user.userFName,
    userLName: req.body.user.userLName,
    userEmail: req.body.user.userEmail,
    userPassword: req.body.user.userPassword,
    createdDate: new Date(),
  });

  // Save User in the database
  Users.createUser(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Errors occured while inserting data to the table.'
      });
    else res.send(data);
  });
};

exports.loginUser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Data should not be empty!'
    });
  }

  const user = new Users({
    userEmail: req.body.user.userEmail,
    userPassword: req.body.user.userPassword,
  });

  // Query user in the database
  Users.loginUser(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Unable to retrieve user info!'
      });
    else res.send(data);
  });
}

exports.getTest = (req, res) => {
  res.send({ message: 'testing backend'});
};