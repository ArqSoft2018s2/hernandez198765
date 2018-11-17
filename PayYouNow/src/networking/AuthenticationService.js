import axios from 'axios';
import dotenv from 'dotenv';

class AuthenticationService {
  constructor() {
    dotenv.config();
    this.axios = axios.create({
      baseURL: process.env.AUTHENTICATION_API,
    });
  }

  post(url, body) {
    return this.axios.post(url, body);
  }

  get(url, token) {
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    return this.axios.get(url, config);
  }
}

export default new AuthenticationService();
