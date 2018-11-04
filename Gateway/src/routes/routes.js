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
};

export default appRouter;
