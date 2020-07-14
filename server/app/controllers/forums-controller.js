const Forums = require('../models/forums.js');
const Comments = require('../models/comments.js');

// Forums controller
exports.createForums = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: `Enter a valid data!`
    });
  }

  // Creating Post
  const forum  = new Forums({
    userID: req.body.forum.userID,
    forumsTitle: req.body.forum.forumsTitle,
    forumsDescription: req.body.forum.forumsDescription,
    forumsDate: new Date()
  });

  console.log("forums:", forum);
  // Save Post in the database
  Forums.create(forum, (err, data) => {
    if (err)
    res.status(500).send({
        message:
          err.message || `Errors occured while inserting data to the table.`
      });
    else res.send(data);
  });
};

exports.getAllForums = (request, response) => {
  Forums.getAllForums((err, data) => {
    if (err) {
      response.status(500).send({
        message: err.message || `Unable to retrieve all posts from the table.`
      });
    } else {
      response.send(data);
    }
  });
};

exports.displayForumsByID = (request, response) => {
  Forums.getForumsByID(request.params.forumsID, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        response.status(404).send({
          message: `Post id ${request.params.forumsID}.`
        });
      } else {
        response.status(500).send({
          message: `Unable to retrieve data for post id ${request.params.forumsID}`
        });
      }
    } else {
      response.send(data);
    }
  });
};

exports.displayUserPost = (request, response) => {
  Forums.getPostbyUser(request.params.userID, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        response.status(404).send({
          message: `User id ${request.params.userID}.`
        });
      } else {
        response.status(500).send({
          message: `Unable to retrieve data for user id ${request.params.userID}`
        });
      }
    } else {
      response.send(data);
    }
  });
};

exports.updateForums = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Enter a valid data!'
    })
  }

  // Creating Post
  const forum  = new Forums({
    forumsTitle: request.body.forum.forumsTitle,
    forumsDescription: request.body.forum.forumsDescription,
    forumsDate: new Date()
  });

  Forums.updateForumsByID(request.params.forumsID, forum, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        response.status(404).send({
          message: `No data found for post id ${request.params.forumsID}`
        })
      } else {
        response.status(500).send({
          message: `Unable to update data for post id ${request.params.forumsID}`
        });
      }
    } else {
      response.send(data);
    }
  });
};

exports.deleteForumsByID = (request, response) => {
  Forums.deleteForumsByID(request.params.forumsID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `No data found for post id ${request.params.forumsID}.`
        });
      } else {
        response.status(500).send({
          message: `Unable to delete post id ${request.params.forumsID}`
        });
      }
    } else response.send({ message: `Post is deleted successfully!` });
  });
};

exports.deleteAllForums = (request, response) => {
  Forums.deleteAllForums((err, data) => {
    if (err) {
      response.status(500).send({
        message: err.message || `Unable to delete all posts!`
      });
    } else {
      response.send({ 
        message: 'All posts are deleted successfully!'
      });
    }
  });
};

//Comments controller
exports.addComment = (request, response) => {
  // Validate request
  if (!request.body) {
    response.status(400).send({
      message: `Enter a valid data!`
    });
  }

  // Creating Comments
  const comments  = new Comments({
    commentsID: request.body.commentsID,
    forumsID: request.body.forumsID,
    userID: request.body.userID,
    commentsDescription: request.body.commentsDescription,
    commentsDate: request.body.commentsDate
  });

  // Save Post in the database
  Comments.saveComments(comments, (err, data) => {
    if (err)
    response.status(500).send({
        message:
          err.message || `Errors occured while inserting data to the table.`
      });
    else response.send(data);
  });
};