import { Button, Form, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from 'react';

import { getForum, updateForum } from './util/forums';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

const UpdateForum = (props) => {
  const { history, match } = props;
  const [isSubmitting, setSubmitting] = useState(false);
  const [isFetchingData, setFetchingData] = useState(true);
  const [formMessage, setFormMessage] = useState(null);
  const [forumData, setForumData] = useState(null);

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        let response = await getForum({ forum: { forumsID: parseFloat(match.params.id) }});
  
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

  const onFinish = async values => {
    setSubmitting(true);
    values.forum.forumsID = parseFloat(match.params.id);

    try {
      let response = await updateForum(values);

      if (Boolean(response.isSuccess)) {
        setSubmitting(false);
        setFormMessage('Updated a Forum successfully!');
        history.push('/forum');
      } else {
        setSubmitting(false);
        setFormMessage('An error occurred during server process!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Fragment>
      <div className="forum-container">
        {!Boolean(isFetchingData) && (
          <div className="post-container">
            <Form className="post"
              initialValues={{ 
                remember: true, 
                forum: { 
                  forumsDescription: forumData.forumsDescription,
                  forumsTitle: forumData.forumsTitle,
                } }}
              onFinish={onFinish} onFinishFailed={onFinishFailed} validateMessages={validateMessages}>
              <h6 className="d-flex justify-content-center">{formMessage}</h6>
              <Form.Item label="Title" name={['forum', 'forumsTitle']} rules={[{ required: true }]} >
                <Input />
              </Form.Item>

              <Form.Item label="Description" name={['forum', 'forumsDescription']} rules={[{ required: true }]}>
                <Input.TextArea rows={10} />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button className="btn-space" loading={isSubmitting} htmlType="submit">
                  Update
                </Button>
                <Button className="btn-space" onClick={() => {history.push('/forum')}}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(UpdateForum);