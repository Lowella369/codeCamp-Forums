const sql = require('../database/db.js');

const Comments = function(comments) {
  this.commentsID = comments.commentsID;
  this.forumsID = comments.forumsID;
  this.userID = comments.userID;
  this.commentsDescription = comments.commentsDescription;
  this.commentsDate = comments.commentsDate;
};

Comments.saveComments = (newComments, result) => {
  sql.query('INSERT INTO comments SET ?', newComments, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    console.log('Comments posted: ', {commentsID: res.insertId, ...newComments});
    result(null, {userID: res.insertId, ...newComments});
  });
};

Comments.getCommentsByForumsId = (forumsID, result) => {
  sql.query(`SELECT users.*, comments.* FROM comments LEFT JOIN users ON users.userID = comments.userID
    WHERE comments.forumsID = ${forumsID}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('Comment found', res);
      result(null, res);
      return;
    }

    // Comment id not found
    result(null, null);
  });
};

module.exports = Comments;