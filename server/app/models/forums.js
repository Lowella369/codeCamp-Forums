const sql = require('../database/db.js');

const Forums = function(forums) {
  this.forumsID = forums.forumsID;
  this.userID = forums.userID;
  this.forumsTitle = forums.forumsTitle;
  this.forumsDescription = forums.forumsDescription;
  this.forumsDate = forums.forumsDate;
};

Forums.create = (newForums, result) => {
  sql.query('INSERT INTO forums SET ?', newForums, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }

    console.log('Post created: ', {forumsID: res.insertId, ...newForums });
    result(null, {forumsID: res.insertId, ...newForums });
  });
};

Forums.getAllForums = result => {
  sql.query('SELECT * FROM forums', (err, res) => {
    if (err) {
      console.log('error:', err);
      result(null, err);
      return;
    }
    console.log('Posts: ', res);
    result(null, res);
  });
};

Forums.getForumsByID = (forumsID, result) => {
  sql.query(`SELECT * FROM forums WHERE forumsID = ${forumsID}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('Post found', res[0]);
      result(null, res[0]);
      return;
    }

    // Post id not found
    result({ kind: 'not_found' }, null);
  });
};

Forums.getPostbyUser = (userID, result) => {
  sql.query(`SELECT * FROM forums WHERE userID = ${userID}`, (err, res) => {
    if (err) {
      console.log('error:', err);
      result(null, err);
      return;
    }
    console.log('Posts: ', res);
    result(null, res);
  });
};

Forums.updateForumsByID = (forumsID, forums, result) => {
  sql.query(
    'UPDATE forums SET forumsTitle = ?, forumsDescription = ?, forumsDate = ? WHERE forumsID = ?',
    [forums.forumsTitle, forums.forumsDescription, forums.forumsDate, forumsID],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Post id not found
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('Post updated: ', { id: forumsID, ...forums });
      result(null, { id: forumsID, ...forums });
    }
  );
};

Forums.deleteForumsByID = (forumsID, result) => {
  sql.query('DELETE FROM forums WHERE forumsID = ?', forumsID, (err, res) => {
    if (err) {
      console.log('Error deleting', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Post id not found
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted post id: ', forumsID);
    result(null, res);
  });
};

Forums.deleteAllForums = result => {
  sql.query('DELETE FROM forums', (err, res) => {
    if (err) {
      console.log('error:', err);
      result(null, err);
      return;
    }
    console.log(`Deleted ${res.affectedRows} forums`);
    result(null, res);
  });
};

module.exports = Forums;