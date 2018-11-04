import TransactionController from '../networking/controllers/TransactionController';

const appRouter = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our restful API');
  });

  app.post('/Transaction', async (req, res) => {
    try {
      const response = await TransactionController.makeCommunications(req, res);
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.response.data);
    }
  });
};

export default appRouter;
