import { Col, Row, Popconfirm, message } from 'antd';
import { withRouter } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';

import { getAllForums } from '../util/forums';
import SideMenu from '../SideMenu';
import '../css/style.css';

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
        <h6 class="d-flex justify-content-center">{formMessage}</h6>
        {(forumData || []).map(({ forumsID, forumsDescription, forumsTitle }) => {
          return (
            <Fragment>
              <Row className="d-flex flex-column post-container" style={{ padding: 50}}>
                <Row>
                  <Col>{forumsTitle}</Col>
                </Row>
                <Row>
                  <Col>View Post</Col>
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