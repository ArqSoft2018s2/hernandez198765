import { promisify } from 'util';
import axios from 'axios';
import ApiConstants from '../helpers/ApiConstants';
import RedisManager from '../managers/RedisManager';

const { PAY_YOU_NOW_API } = ApiConstants;
class HttpService {
  constructor() {
    const getAsync = promisify(RedisManager.get).bind(RedisManager);
    const token = getAsync('tokenPayYouNow');
    this.axios = axios.create({
      baseURL: PAY_YOU_NOW_API,
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
