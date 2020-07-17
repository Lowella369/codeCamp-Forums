import axios from 'axios';

import { SERVER_URL } from './constants';

export const loginUser = (req) => {
  return axios.post(`${SERVER_URL}/user/login`, {
    user: req.user,
  }).then(res => {
    if (res.status !== 200 || res.data.response.length === 0) {
      return { isSuccess: false };
    }

    return { data: res.data, isSuccess: res.status === 200 };
  });
}

export const signupUser = (req) => {
  return axios.post(`${SERVER_URL}/user/signup`, {
    user: req.user,
  }).then(res => {
    if (res.status !== 200 || res.data?.userInfo?.userEmail === req.user?.userEmail) {
      return { isSuccess: false, emailExists: res.data.userInfo.userEmail === req.user.userEmail };
    }

    return { data: res.data, isSuccess: res.status === 200 };
  });
}