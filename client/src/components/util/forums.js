import axios from 'axios';

import { SERVER_URL } from './constants';

// Mutation 
export const createForum = (req) => {
  return axios.post(`${SERVER_URL}/forums/create`, {
    forum: req.forum,
  }).then(res => {
    if (res.status !== 200) {
      return { isSuccess: false };
    }

    return { data: res.data, isSuccess: res.status === 200 };
  });
}

export const deleteForum = (req) => {
  return axios.delete(`${SERVER_URL}/user/forums/${req.forum.forumsID}`).then(res => {
    if (res.status !== 200) {
      return { isSuccess: false };
    }

    return { data: res.data, isSuccess: res.status === 200 };
  });
}

export const updateForum = (req) => {
  return axios.put(`${SERVER_URL}/forums/update/${req.forum.forumsID}`, {
    forum: req.forum,
  }).then(res => {
    if (res.status !== 200) {
      return { isSuccess: false };
    }

    return { data: res.data, isSuccess: res.status === 200 };
  });
}

// Query
export const getAllForumsByUser = (req) => {
  return axios.get(`${SERVER_URL}/forums/user/${req.forum.userID}`).then(res => {
    if (res.status !== 200) {
      return { isSuccess: false };
    }

    return { data: res.data, isSuccess: res.status === 200 };
  });
}

export const getForum = (req) => {
  return axios.get(`${SERVER_URL}/forums/${req.forum.forumsID}`).then(res => {
    if (res.status !== 200) {
      return { isSuccess: false };
    }

    return { data: res.data, isSuccess: res.status === 200 };
  });
}

export const getAllForums = (req) => {
  return axios.get(`${SERVER_URL}/forums/`).then(res => {
    if (res.status !== 200) {
      return { isSuccess: false };
    }

    return { data: res.data, isSuccess: res.status === 200 };
  });
}