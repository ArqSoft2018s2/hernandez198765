const express = require('express');
const bodyParser = require('body-parser');
const httpService = require('./src/networking/HttpService');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

httpService(app);

const server = app.listen(8001, () => {
  console.log('app running on port.', server.address().port);
});
