import TransactionController from '../networking/controllers/TransactionController';

const appRouter = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our restful API');
  });

  app.post('/Transaction', async (req, res, next) => {
    try {
      const response = await TransactionController.makeCommunications(
        req,
        res,
        next,
      );
      res.status(200).send(response);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.delete('/Transaction/:transactionId', async (req, res) => {
    try {
      const { transactionId } = req.params;
      const response = await TransactionController.returnPurchase(
        transactionId,
      );
      res.status(200).send(response);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.put('/Transaction', async (req, res) => {
    try {
      const transactionToChargeback = req.body;
      const response = await TransactionController.chargeback(
        transactionToChargeback,
      );
      res.status(200).send(response);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });
};

export default appRouter;
