import express from 'express';
import bodyParser from 'body-parser';
import DatabaseManager from './src/managers/DatabaseManager';
import routes from './src/routes/routes';

// Express Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);

const setupServer = () => {
  const server = app.listen(8003, () => {
    console.log('app running on port.', server.address().port);
  });
};

DatabaseManager.connect().then(() => setupServer());
