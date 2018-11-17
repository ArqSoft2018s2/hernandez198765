import { promisify } from 'util';
import axios from 'axios';
import dotenv from 'dotenv';
import RedisManager from '../managers/RedisManager';

class HttpService {
  constructor() {
    dotenv.config();
    const getAsync = promisify(RedisManager.get).bind(RedisManager);
    const token = getAsync('tokenCommerce');
    console.log(token);
    this.axios = axios.create({
      baseURL: process.env.PAY_YOU_NOW_API,
      headers: { 'X-Authorization': token },
    });
  }

  get(url, params = {}) {
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
