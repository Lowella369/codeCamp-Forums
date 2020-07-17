module.exports = app => {
  const forums = require('../controllers/forums-controller.js');
  const user = require('../controllers/user-controller.js');

  // QUERY MUTATION FOR USER
  app.post('/user/login', user.loginUser);
  app.post('/user/signup', user.createUser);

  // QUERY MUTATION FOR FORUM
  app.post('/forums/create', forums.createForums);
  //display all forums from all users: this api is working
  app.get('/forums', forums.getAllForums);

  //this will display post by id
  app.get('/forums/:forumsID', forums.displayForumsByID);

  //user add comments to a post
  app.post('/forums/:forumsID', forums.addComment);

  //display all comments for a specific post or forum id
  app.get('/forums/thread/:forumsID', forums.displayCommentByForumId);

  //user create a post
  app.post('/user/forums', forums.createForums);

  //display all post created by a specific user
  app.get('/forums/user/:userID',forums.displayUserPost);

  //when the user wants to update their post
  app.put('/forums/update/:forumsID', forums.updateForums);
  
  //when the user wants to delete their specific post
  app.delete('/user/forums/:forumsID', forums.deleteForumsByID);
  
  app.delete('/user/forums', forums.deleteAllForums);

}