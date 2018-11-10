import axios from 'axios';
import dotenv from 'dotenv';

class ErrorService {
  constructor() {
    dotenv.config();
    this.axios = axios.create({
      baseURL: process.env.ERROR_API,
    });
  }

  post(url, body) {
    return this.axios.post(url, body);
  }
}

export default new ErrorService();
