import { Col, Row, Popconfirm, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';

import { deleteForum, getAllForumsByUser } from '../util/forums';
import SideMenu from '../SideMenu';

const Forum = (props) => {
  const { history } = props;
  const [isFetchingData, setFetchingData] = useState(true);
  const [formMessage, setFormMessage] = useState(null);
  const [forumData, setForumData] = useState(null);

  const isLoggedIn = localStorage.getItem('USER_ID');
  
  useEffect(() => {
    const fetchForumData = async () => {
      try {
        let response = await getAllForumsByUser({ forum: { userID: parseFloat(isLoggedIn) }});
  
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
      <div className="d-flex w-100 flex-column forum-container">
        <h6 className="d-flex justify-content-center">{formMessage}</h6>
        {(forumData || []).map(({ forumsID, forumsDescription, forumsTitle }) => {
          return (
            <Fragment>
              <Row className="d-flex flex-column post-container">
                <Row className="post-title">
                  <Col>Forum Title:</Col>
                  <Col className="title">{forumsTitle}</Col>
                </Row>
                <Row className="post-description"> 
                  <Col>Forum Description:</Col>
                  <Col className="description">{forumsDescription}</Col>
                </Row>
                <Row className="btn-center">
                  <Button className="btn-space " onClick={() => { history.push(`/forumupdate/${forumsID}`)}}>
                    Update
                  </Button>
                  <Button className="btn-space">
                  <Popconfirm title="Are you sure delete this forum?" onConfirm={async () => {
                    try {
                      let response = await deleteForum({forum: { forumsID: forumsID }});
                    
                      if (Boolean(response.isSuccess)) {
                        setFormMessage(`Forum Id ${forumsID} was deleted successfully!`);
                        setFetchingData(true);
                      } else {
                        setFormMessage('An error occurred during server process!');
                      }
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                    okText="Yes"
                    cancelText="No">
                    Delete
                  </Popconfirm>
                  </Button>
                </Row>
              </Row>
            </Fragment>
          );
        })}
        {(forumData || []).length === 0 && ''}
      </div>
    </Fragment>
  );
};

export default withRouter(Forum);