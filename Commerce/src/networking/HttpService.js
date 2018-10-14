const axios = require('axios');
const TransactionSchema = require('../models/TransactionSchema');

const appRouter = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our restful API');
  });

  const testingCommunication = async (req, res) => {
    try {
      const payYouNowResponse = await axios.get('http://localhost:8001/test');
      const newTransaction = new TransactionSchema(req.body.transaction);

      newTransaction.save((error, transaction) => {
        if (error) {
          res.status(500).send('Error');
        } else {
          res.send(200).send(transaction);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  app.post('/probando', (req, res) => {
    testingCommunication(req, res);
  });
};

module.exports = appRouter;
