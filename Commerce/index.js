const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./src/networking/HttpService');

// Express Configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose Configuration
mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb://localhost:27017/commerce_db',
    { useNewUrlParser: true },
  )
  .then(() => {
    console.log(`Connection Successful`);
    routes(app, mongoose);

    const server = app.listen(3000, () => {
      console.log('app running on port.', server.address().port);
    });
  })
  .catch(() => {
    console.log('Cant connect with Database');
  });
