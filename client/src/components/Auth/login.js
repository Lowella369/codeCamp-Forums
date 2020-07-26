import { Form, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

import { loginUser } from './util/users';

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

const Login = (props) => {
  const { history } = props;
  const [isSubmitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const onFinish = async values => {
    setSubmitting(true);
    try {
      let response = await loginUser(values);

      console.log(response);
      
      if (Boolean(response.isSuccess)) {
        setSubmitting(false);
        localStorage.setItem('USER_ID', response.data.response.userID);
        localStorage.setItem('NAME', response.data.response.userFName.concat(' ', response.data.response.userLName))
        history.push('/home');
      } else {
        setSubmitting(false);
        setFormMessage('Incorrect email or password!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="d-flex justify-content-center w-100 align-items-center forum-container ">
      <div className="auth-center">
        <div className="post-container">
          <Form className="auth" {...layout} name="users" initialValues={{ remember: true }}
            onFinish={onFinish} onFinishFailed={onFinishFailed} validateMessages={validateMessages}>
            <h6 className="d-flex justify-content-center">{formMessage}</h6>

            <Form.Item  label="Email" name={['user', 'userEmail']} rules={[{ required: true, type: 'email' }]} >
              <Input />
            </Form.Item>

            <Form.Item label="Password" name={['user', 'userPassword']} rules={[{ required: true }]} >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button className="btn-space" loading={isSubmitting}  htmlType="submit" >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);