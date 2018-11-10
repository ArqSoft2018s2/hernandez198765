import NetworkController from '../networking/controllers/NetworkController';

const appRouter = app => {
  app.post('/Network', async (req, res) => {
    try {
      const transaction = req.body;
      const response = await NetworkController.fraudControl(transaction);
      res.status(200).send({ ...response, aprobada: 'aprobada' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete('/Network/:transactionId', async (req, res) => {
    try {
      const { amount, transactionId } = req.params;
      await NetworkController.returnPurchase(transactionId, amount);
      res.status(200).send('Transaction returned');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

export default appRouter;
