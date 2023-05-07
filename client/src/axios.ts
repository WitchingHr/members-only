import axios, { Axios } from 'axios';

// create an axios instance
const instance: Axios = axios.create({
  headers: {
    common: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
});

export default instance;
