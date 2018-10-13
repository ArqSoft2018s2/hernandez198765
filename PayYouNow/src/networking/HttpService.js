const axios = require('axios');

//gateway 8002
//network 8003
//transmitter 8004

const appRouter = app => {
  let paymentResponse = '';

  const communicateWithTransmitter = async (req, res) => {
    try {
      const transmitterResponse = await axios.get('');
      paymentResponse += transmitterResponse.data;
      res.status(200).send(paymentResponse);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const communicateWithNetwork = async (req, res) => {
    try {
      const networkResponse = await axios.get('');
      paymentResponse += networkResponse.data;
      communicateWithTransmitter(req, res);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const communicateWithGateway = async (req, res) => {
    try {
      const gatewayResponse = await axios.get('');
      paymentResponse += gatewayResponse.data;
      communicateWithNetwork(req, res);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const makeCommunications = (req, res) => {
    // TODO: ask about the promise chain..
    communicateWithGateway(req, res);
  };

  app.get('/test', (req, res) => {
    makeCommunications(req, res);
  });
};

module.exports = appRouter;
