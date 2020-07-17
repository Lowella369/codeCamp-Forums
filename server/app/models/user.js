const sql = require('../database/db.js');

const Users = function(user) {
  this.userID = user.userID;
  this.userFName = user.userFName;
  this.userLName = user.userLName;
  this.userEmail = user.userEmail;
  this.userPassword = user.userPassword;
  this.createdDate = user.createdDate
};

Users.createUser = (newUser, result) => {
  let userInfo = [];

  sql.query(`SELECT * FROM users WHERE userEmail ='${newUser.userEmail}'`,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      }

      if (res.length > 0 ) {
        userInfo = res.reduce(obj => obj);
        result(null, { userInfo });
      }

      if (userInfo.length === 0) {
        sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
          if (err) {
            console.log(err);
            result(err, null);
            return;
          }
    
          result(null, {userID: res.insertId, ...newUser });
        });
      }
    }
  );  
};

Users.loginUser = (user, result) => {
  sql.query(`SELECT * FROM users WHERE userEmail='${user.userEmail}' AND userPassword='${user.userPassword}'`, 
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      let response = [];

      if (res.length > 0 ) {
        response = res.reduce(obj => obj);
      }
      result(null, { response });
    })
};

module.exports = Users;