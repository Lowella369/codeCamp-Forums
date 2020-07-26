import { Col, Row } from 'antd';
import { withRouter } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';

import '../../../src/App.css';
import { getAllForums } from '../Forum/util/forums';
import Comment from './comment';

const Forum = () => {
  const [isFetchingData, setFetchingData] = useState(true);
  const [formMessage, setFormMessage] = useState(null);
  const [forumData, setForumData] = useState(null);

  const isLoggedIn = localStorage.getItem('USER_ID');
  
  useEffect(() => {
    const fetchForumData = async () => {
      try {
        let response = await getAllForums({ forum: { userID: parseFloat(isLoggedIn) }});
  
        if (Boolean(response.isSuccess)) {
          setForumData(response.data);
          setFetchingData(false);
        } else {
          setFormMessage('An error occurred during server process!');
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (isFetchingData) {
      fetchForumData();
    }
  });

  return (
    <Fragment>
      <div className="d-flex w-100 flex-column forum-container">
        <h6 className="d-flex justify-content-center">{formMessage}</h6>
        {(forumData || []).map(({ 
          // forums data
          forumsID, 
          forumsDate, 
          forumsDescription, 
          forumsTitle,

          // users data
          userFName,
          userLName,
        }) => {
          return (
            <Fragment key={forumsID}>
              <Row className="row post-container">
                <Row className="col-sm-3 d-flex flex-column">
                  <Col className="comment-name">Created By: {userFName.concat(' ', userLName, ' ')}</Col>
                  <Col className="comment-name">Date Created: {new Date(forumsDate).toLocaleDateString()}</Col>
                </Row>
                <Row className="col-sm-6 d-flex flex-column">
                  <Row className="post-title">
                    <Col>Title:</Col><Col className="home-title"> {forumsTitle}</Col>
                  </Row>
                  <Row className="post-description">
                    <Col>Description:</Col><Col className="home-description"> {forumsDescription}</Col>
                  </Row>
                  <Row className="comment">
                    <Col>
                      <Comment forumsID={forumsID} userID={isLoggedIn} />
                    </Col>
                  </Row>
                </Row>
              </Row>
            </Fragment>
          );
        })}
        {(forumData || []).length === 0 && <Col className="inform-text">No Post to display yet</Col>}
      </div>
    </Fragment>
  );
};

export default withRouter(Forum);