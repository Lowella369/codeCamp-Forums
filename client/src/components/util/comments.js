import axios from 'axios';

import { SERVER_URL } from './constants';

// Mutation 
export const createComment = (req) => {
  return axios.post(`${SERVER_URL}/forums/${req.comment.forumsID}`, {
    comment: req.comment,
  }).then(res => {
    if (res.status !== 200) {
      return { isSuccess: false };
    }

    return { data: res.data, isSuccess: res.status === 200 };
  });
}

// Query
export const getComments = (req) => {
  return axios.get(`${SERVER_URL}/forums/thread/${req.comment.forumsID}`).then(res => {
    if (res.status !== 200) {
      return { isSuccess: false };
    }

    return { data: res.data, isSuccess: res.status === 200 };
  });
}