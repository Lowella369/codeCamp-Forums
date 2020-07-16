import { Col, Row, Popconfirm, message } from 'antd';
import { withRouter } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';

import '../css/style.css';
import { getAllForums } from '../util/forums';
import Comment from './comment';
import SideMenu from '../SideMenu';

const Forum = (props) => {
  const { history } = props;
  const [isFetchingData, setFetchingData] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
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
      <SideMenu />
      <div className="d-flex w-100 flex-column">
        <h6 className="d-flex justify-content-center">{formMessage}</h6>
        {(forumData || []).map(({ 
          // forums data
          forumsID, 
          forumsDate, 
          forumsDescription, 
          forumsTitle,

          // users data
          userID,
          userFName,
          userLName,
        }) => {
          return (
            <Fragment key={forumsID}>
              <Row className="row post-container" style={{ padding: 50}}>
                <Row className="col-sm-3 d-flex flex-column">
                  <Col>Name: {userFName.concat(' ', userLName, ' ')}</Col>
                  <Col>Created Forum: {new Date(forumsDate).toLocaleDateString()}</Col>
                </Row>
                <Row className="col-sm-6 d-flex flex-column">
                  <Col>Title: {forumsTitle}</Col>
                  <Col>Description: {forumsDescription}</Col>
                  <Row style={{marginTop: 20}}>
                    <Col>
                      <Comment forumsID={forumsID} userID={isLoggedIn} />
                    </Col>
                  </Row>
                </Row>
              </Row>
            </Fragment>
          );
        })}
        {(forumData || []).length === 0 && '--'}
      </div>
    </Fragment>
  );
};

export default withRouter(Forum);