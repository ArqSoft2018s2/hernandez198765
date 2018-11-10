import GatewayController from '../networking/controllers/GatewayController';

const appRouter = app => {
  app.post('/Gateway', async (req, res) => {
    try {
      const transaction = req.body;
      const transactionWithCard = await GatewayController.identifyNetwork(
        transaction,
      );
      console.log('RESPONDIENDO');
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
};

export default appRouter;
