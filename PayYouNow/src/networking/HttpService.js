import axios from 'axios';
import ApiConstants from '../helpers/ApiConstants';

const { PAY_YOU_NOW_API } = ApiConstants;
class HttpService {
  constructor() {
    this.axios = axios.create({
      baseURL: PAY_YOU_NOW_API,
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

  delete(url, body = {}) {
    const data = { data: body };
    return this.axios.delete(url, data);
  }
}

export default new HttpService();
