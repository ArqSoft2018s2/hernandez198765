import express from 'express';
import bodyParser from 'body-parser';
import DatabaseManager from './src/managers/DatabaseManager';
import AuthenticationController from './src/networking/controllers/AuthenticationController';
import routes from './src/routes/routes';
import authentication from './src/middlewares/authenticationMiddleware';

// Express Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('*', authentication);
routes(app);

const setupServer = () => {
  const server = app.listen(8002, () => {
    console.log('app running on port.', server.address().port);
  });
};

DatabaseManager.connect().then(async () => {
  setupServer();
  const body = {
    username: process.env.APP_NAME,
    password: process.env.APP_PASSWORD,
  };
  try {
    await AuthenticationController.register(body);
    await AuthenticationController.authenticate(body);
  } catch (error) {
    await AuthenticationController.authenticate(body);
  }
});
