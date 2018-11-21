import GatewayController from '../networking/controllers/GatewayController';

const appRouter = app => {
  app.post('/Gateway', async (req, res) => {
    try {
      console.log('Llegando a gateway');
      const transaction = req.body;
      const transactionWithCard = await GatewayController.identifyNetwork(
        transaction,
      );
      console.log('Tamo en vivo');
      res.status(200).send(transactionWithCard);
    } catch (error) {
      console.log('Tamo en off');
      res.status(500).send(error.message);
    }
  });

  app.delete('/Gateway/:transactionId', async (req, res) => {
    try {
      console.log('Llegando a gateway');
      const { amount, transactionId } = req.params;
      await GatewayController.returnPurchase(transactionId, amount);
      console.log('Tamo en vivo');
      res.status(200).send('Transaction returned');
    } catch (error) {
      console.log('Tamo en off');
      res.status(500).send(error.message);
    }
  });

  app.get('/Gateway', async (req, res) => {
    try {
      console.log('Llegando a gateway');
      const { RUT, startDate, endDate } = req.query;
      const response = await GatewayController.batchClosingTransaction(
        RUT,
        startDate,
        endDate,
      );
      console.log('Tamo en vivo');
      res.status(200).send(response);
    } catch (error) {
      console.log('Tamo en off');
      res.status(500).send(error.message);
    }
  });
};

export default appRouter;
