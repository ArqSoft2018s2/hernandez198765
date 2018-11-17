import { promisify } from 'util';
import dotenv from 'dotenv';
import AuthenticationService from '../AuthenticationService';
import RedisManager from '../../managers/RedisManager';

class LoggerController {
  constructor() {
    dotenv.config();
    this.BASE_API = '/Logger';
  }

  register = async body => {
    try {
      await AuthenticationService.post('/Register', body);
    } catch (error) {
      throw new Error(error);
    }
  };

  authenticate = async body => {
    const response = await AuthenticationService.post('/Authenticate', body);
    const setAsync = promisify(RedisManager.set).bind(RedisManager);
    await setAsync('tokenCommerce', response.data.token);
  };
}

export default new LoggerController();
