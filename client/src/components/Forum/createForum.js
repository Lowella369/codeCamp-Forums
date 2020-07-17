import { Button, Form, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import React, { Fragment, useState } from 'react';

import { createForum } from '../util/forums';
import SideMenu from '../SideMenu';

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
};

const CreateForum = (props) => {
  const { history } = props;
  const [isSubmitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const isLoggedIn = localStorage.getItem('USER_ID');
  
  const onFinish = async values => {
    setSubmitting(true);
    values.forum.userID = parseFloat(isLoggedIn);

    try {
      let response = await createForum(values);

      if (Boolean(response.isSuccess)) {
        setSubmitting(false);
        setFormMessage('Added a new Forum successfully!');
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
        <div className="post-container">
          <Form 
            name="forums"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
          >
            <h6 className="d-flex justify-content-center">{formMessage}</h6>
            <Form.Item
              label="Title"
              name={['forum', 'forumsTitle']}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name={['forum', 'forumsDescription']}
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={10}/>
            </Form.Item>

            <div className="btn-center">
              <Form.Item {...tailLayout}>
                <Button className="btn-space"
                  loading={isSubmitting}
                  htmlType="submit"
                >
                  Save
                </Button>
                <Button className="btn-space"
                  onClick={() => {
                    history.push('/forum');
                  }}
                >
                  Cancel
                </Button>
              </Form.Item>
            </div>
           </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(CreateForum);