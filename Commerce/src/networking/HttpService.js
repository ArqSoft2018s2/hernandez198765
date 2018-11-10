import axios from 'axios';
import dotenv from 'dotenv';

class HttpService {
  constructor() {
    dotenv.config();
    this.axios = axios.create({
      baseURL: process.env.PAY_YOU_NOW_API,
    });
  }

  get(url, params = {}) {
    console.log(this.axios);
    return this.axios.get(url, {
      params,
    });
  }

  post(url, body) {
    return this.axios.post(url, body);
  }

  put(url, body) {
    return this.axios.put(url, body);
  }

  patch(url, body) {
    return this.axios.patch(url, body);
  }

  delete(url) {
    return this.axios.delete(url);
  }
}

export default new HttpService();
