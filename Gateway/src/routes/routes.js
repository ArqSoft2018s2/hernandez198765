import GatewayController from '../networking/controllers/GatewayController';

const appRouter = app => {
  app.post('/Gateway', async (req, res) => {
    try {
      const transaction = req.body;
      const transactionWithCard = await GatewayController.identifyNetwork(
        transaction,
      );
      res.status(200).send(transactionWithCard);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete('/Gateway/:transactionId', async (req, res) => {
    try {
      const { amount, transactionId } = req.params;
      await GatewayController.returnPurchase(transactionId, amount);
      res.status(200).send('Transaction returned');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.get('/Gateway', async (req, res) => {
    try {
      const { RUT, startDate, endDate } = req.query;
      const response = await GatewayController.batchClosingTransaction(
        RUT,
        startDate,
        endDate,
      );
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

export default appRouter;
