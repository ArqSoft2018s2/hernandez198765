import { promisify } from 'util';
import axios from 'axios';
import RedisManager from '../managers/RedisManager';

class HttpService {
  constructor() {
    this.axios = axios.create();
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

  setDefaultHeaders = async () => {
    const getAsync = promisify(RedisManager.get).bind(RedisManager);
    const token = await getAsync('tokenPayYouNow');
    this.axios.defaults.headers.common['x-authorization'] = token;
  };
}

export default new HttpService();
