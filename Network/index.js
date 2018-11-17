import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import DatabaseManager from './src/managers/DatabaseManager';
import routes from './src/routes/routes';

dotenv.config();

// Express Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);

const setupServer = () => {
  const server = app.listen(process.env.PORT, () => {
    console.log('app running on port.', server.address().port);
  });
};

DatabaseManager.connect().then(() => setupServer());
