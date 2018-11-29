import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import AuthenticationController from './src/networking/controllers/AuthenticationController';
import DatabaseManager from './src/managers/DatabaseManager';
import routes from './src/routes/routes';
import authentication from './src/middlewares/authenticationMiddleware';

// .env configuration
dotenv.config();

// Express Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('*', authentication);
routes(app);

const setupServer = () => {
  const server = app.listen(process.env.PORT, () => {
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
