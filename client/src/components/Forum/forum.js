import { Col, Row, Popconfirm, message } from 'antd';
import { withRouter } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';

import { deleteForum, getAllForumsByUser } from '../util/forums';
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
      <div className="d-flex w-100 flex-column forums">
        <h6 className="d-flex justify-content-center">{formMessage}</h6>
        {(forumData || []).map(({ forumsID, forumsDescription, forumsTitle }) => {
          return (
            <Fragment>
              <Row className="d-flex flex-column" style={{ padding: 50}}>
                <Row>
                  <Col style={{ marginRight: 20}}>Forum Title:</Col>
                  <Col>{forumsTitle}</Col>
                </Row>
                <Row>
                  <Col style={{ marginRight: 20}}>Forum Description:</Col>
                  <Col>{forumsDescription}</Col>
                </Row>
                <Row>
                  <Col 
                    onClick={() => { history.push(`/forumupdate/${forumsID}`)}} 
                    style={{ cursor: 'pointer', marginRight: 20}}
                  >
                    Update
                  </Col>
                  <Col style={{ marginRight: 20}}>
                  <Popconfirm
                    title="Are you sure delete this forum?"
                    onConfirm={async () => {
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
                    cancelText="No"
                  >
                    <a href="#">Delete</a>
                  </Popconfirm>
                  </Col>
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