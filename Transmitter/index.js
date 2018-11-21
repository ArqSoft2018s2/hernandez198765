import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import DatabaseManager from './src/managers/DatabaseManager';
import routes from './src/routes/routes';
import authentication from './src/middlewares/authenticationMiddleware';

// Environment Variables configuration
dotenv.config();
// Express Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('*', authentication);
routes(app);

const setupServer = () => {
  const server = app.listen(8004, () => {
    console.log('app running on port.', server.address().port);
  });
};

DatabaseManager.connect().then(() => setupServer());
