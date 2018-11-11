import Rollbar from 'rollbar';

class RollbarManager {
  constructor() {
    this.rollbar = new Rollbar({
      accessToken: '207eaebd725f4d12b0afb59033ca0557',
      captureUncaught: true,
      captureUnhandledRejections: true,
    });
  }

  rollbarLog = log => {
    const payload = { data: { log } };
    this.rollbar.log('LOG', payload);
  };

  rollbarError = error => {
    const payload = { data: { error } };
    this.rollbar.error('ERROR', payload);
  };
}

export default new RollbarManager();
