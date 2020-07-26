import { Button, Col, Form, Input, Row } from 'antd';
import { format } from 'date-fns/fp';
import { withRouter } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';

import { createComment, getComments } from './util/comments';
import '../../../src/App.css';

const validateMessages = {
  required: 'Comment is required!',
};

const Comment = (props) => {
  const [isFetchingData, setFetchingData] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isCommenting, setCommenting] = useState(false);
  const [commentData, setCommentData] = useState(null);

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        let response = await getComments({ comment: { forumsID: props.forumsID }});
  
        if (Boolean(response.isSuccess)) {
          setCommentData(response.data);
          setFetchingData(false);
        } else {
          setFetchingData(false);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (isFetchingData) {
      fetchCommentData();
    }
  });

  const onFinish = async values => {
    setSubmitting(true);
    values.comment.forumsID = props.forumsID;
    values.comment.userID = props.userID;

    try {
      let response = await createComment(values);

      if (Boolean(response.isSuccess)) {
        setSubmitting(false);
        setCommenting(false);
        setFetchingData(true);
      } else {
        setCommenting(false);
        setSubmitting(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Fragment>
      <Row className="d-flex flex-column ">
        {(commentData || []).length === 0 && <Col className="comment-header">No Comments Yet!</Col>}
        {(commentData || []).length > 0 && <Col className="comment-header">List of Comments</Col>}
        {(commentData || []).map(({
          // comments
          commentsID,
          commentsDate,
          commentsDescription,

          // users
          userFName,
          userLName,
        }) => {
          return (
            <Row className="col-sm-12 flex-column comment" key={commentsID}>
              <Row>
                <Col className="comment-name">{userFName.concat(' ', userLName).concat(' ', format('Pp')(new Date(commentsDate)))}</Col>
              </Row>
              <Row >
                <Col className="comment-item">{commentsDescription}</Col>
              </Row>
            </Row>
          );
        })}
      </Row>
      <Row>
        {!isCommenting && (
          <Col>
            <Button className="btn-space" onClick={() => { setCommenting(true); }}>
              Comment Now
            </Button>
          </Col>
        )}
        {isCommenting && (
          <Col>
            <Form initialValues={{ remember: true, setCommenting: setCommenting }} name="forums"
              onFinish={onFinish} validateMessages={validateMessages}>
              <Fragment>
                <Form.Item className="comment-box"
                  name={['comment', 'commentsDescription']}
                  rules={[{ required: true }]}>
                  <Input.TextArea rows={3}/>
                </Form.Item>
                <Form.Item >
                  <div className="comment-button">
                    <Button className="btn-space" loading={isSubmitting} htmlType="submit">
                      Save
                    </Button>
                    <Button className="btn-space" onClick={() => {setCommenting(false);}}>
                      Cancel
                    </Button>
                  </div>
                </Form.Item>
              </Fragment>
            </Form>
          </Col>
        )}
      </Row>
    </Fragment>
  );
};

export default withRouter(Comment);