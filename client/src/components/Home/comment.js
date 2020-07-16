import { Button, Col, Form, Input, Row } from 'antd';
import { format } from 'date-fns/fp';
import { withRouter } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';

import { createComment, getComments } from '../util/comments';

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
  }, [isFetchingData]);

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
      <Row className="d-flex flex-column" style={{marginBottom: 20}}>
        {(commentData || []).length === 0 && 'No Comments Yet!'}
        {(commentData || []).length > 0 && <Col style={{fontWeight: 700}}>List of Comments</Col>}
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
            <Row className="d-flex flex-column" key={commentsID} style={{padding: 10}}>
              <Row>
                <Col>{userFName.concat(' ', userLName).concat(' ', format('Pp')(new Date(commentsDate)))}</Col>
              </Row>
              <Row style={{marginLeft: 10}}>
                <Col>{commentsDescription}</Col>
              </Row>
            </Row>
          );
        })}
      </Row>
      <Row>
        <Col 
          onClick={() => {
            setCommenting(true);
          }}
          style={{cursor: 'pointer'}}
        >
          {!isCommenting && <Col style={{textDecoration: 'underline'}}>Comment Now</Col>}
          {isCommenting && (
            <Fragment>
              <Form 
                initialValues={{ remember: true }}
                name="forums"
                onFinish={onFinish}
                style={{ width: 450}}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name={['comment', 'commentsDescription']}
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={3}/>
                </Form.Item>
                <Form.Item>
                  <Button 
                    loading={isSubmitting}
                    htmlType="submit"
                    type="primary" 
                  >
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Fragment>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(Comment);