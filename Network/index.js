import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import redis from 'redis';
import DatabaseManager from './src/managers/DatabaseManager';
import routes from './src/routes/routes';

dotenv.config();
const redisClient = redis.createClient();

// Express Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app, redisClient);

const setupServer = () => {
  const server = app.listen(process.env.PORT, () => {
    console.log('app running on port.', server.address().port);
    redisClient.on('error', error => {
      console.log('Something went wrong ', error);
    });
  });
};

DatabaseManager.connect().then(() => setupServer());
