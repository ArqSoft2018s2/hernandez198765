import ErrorService from '../ErrorService';

class LoggerController {
  constructor() {
    this.BASE_API = '/Logger';
  }

  registerLog = log => {
    const uri = this.BASE_API;
    const body = { type: 'LOG', data: log };
    ErrorService.post(uri, body);
  };

  registerError = error => {
    const uri = this.BASE_API;
    const body = { type: 'LOG', data: error };
    ErrorService.post(uri, body);
  };
}

export default new LoggerController();
