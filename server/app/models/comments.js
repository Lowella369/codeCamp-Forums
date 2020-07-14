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

module.exports = Comments;