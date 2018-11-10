import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './src/routes/routes';

// Environment Variables configuration
dotenv.config();
// Express Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);

const server = app.listen(8009, () => {
  console.log('app running on port.', server.address().port);
});
