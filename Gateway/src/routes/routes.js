import GatewayController from '../networking/controllers/GatewayController';

const appRouter = app => {
  app.post('/Gateway', (req, res) => {
    try {
      const transaction = req.body;
      const transactionWithCard = GatewayController.identifyNetwork(
        transaction,
      );
      res.status(200).send(transactionWithCard);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

export default appRouter;
