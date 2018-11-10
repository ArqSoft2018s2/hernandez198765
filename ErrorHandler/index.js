import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: '207eaebd725f4d12b0afb59033ca0557',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log('Hello world!');
