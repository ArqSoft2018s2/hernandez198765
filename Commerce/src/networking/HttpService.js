const axios = require('axios');

const appRouter = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our restful API');
  });

  const testingCommunication = async (req, res) => {
    try {
      const payYouNowResponse = await axios.get('http://localhost:8001/test');
      res.status(200).send(payYouNowResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  app.get('/probando', (req, res) => {
    testingCommunication(req, res);
  });
};

module.exports = appRouter;
