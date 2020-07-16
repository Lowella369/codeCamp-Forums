import { Form, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

import { signupUser } from '../util/users';
import '../css/style.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
  },
};

const SignUp = (props) => {
  const { history } = props;
  const [isSubmitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const onFinish = async values => {
    setSubmitting(true);
    try {
      let response = await signupUser(values);
      
      if (Boolean(response.isSuccess)) {
        setSubmitting(false);
        setFormMessage('User added successfully!');
        history.push('/login');
      } else {
        setSubmitting(false);
        if (Boolean(response.emailExists)) {
          setFormMessage('User email already exists!');
        } else {
          setFormMessage('An error occurred during server process!');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="d-flex justify-content-center w-100 forum-container">
      <div className="signup">
      <Form
        {...layout}
        name="users"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <h6 className="d-flex justify-content-center">{formMessage}</h6>
        <Form.Item
          label="Firstname"
          name={['user', 'userFName']}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Lastname"
          name={['user', 'userLName']}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name={['user', 'userEmail']}
          rules={[{ required: true, type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name={['user', 'userPassword']}
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button 
            loading={isSubmitting}
            type="primary" 
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
      
    </div>
  );
};

export default withRouter(SignUp);
