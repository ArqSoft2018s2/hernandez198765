const axios = require('axios');
const apiConstants = require('../helpers/ApiConstants');

const appRouter = app => {
  let paymentResponse = `Commerce starts communication`;

  const communicateWithTransmitter = async (req, res) => {
    try {
      const url = `${apiConstants.TRANSMITTER_API}/test`;
      const transmitterResponse = await axios.get(url);
      paymentResponse = `${paymentResponse}
                         ${transmitterResponse.data}`;
      res.status(200).send(paymentResponse);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const communicateWithNetwork = async (req, res) => {
    try {
      const url = `${apiConstants.NETWORK_API}/test`;
      const networkResponse = await axios.get(url);
      paymentResponse = `${paymentResponse}
                         ${networkResponse.data}`;
      communicateWithTransmitter(req, res);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const communicateWithGateway = async (req, res) => {
    try {
      const url = `${apiConstants.GATEWAY_API}/test`;
      const gatewayResponse = await axios.get(url);
      paymentResponse = `${paymentResponse}
                         ${gatewayResponse.data}`;
      communicateWithNetwork(req, res);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  const makeCommunications = (req, res) => {
    // TODO: ask about the promise chain..
    communicateWithGateway(req, res);
  };

  app.post('/Transaction', (req, res) => {
    makeCommunications(req, res);
  });
};

module.exports = appRouter;
