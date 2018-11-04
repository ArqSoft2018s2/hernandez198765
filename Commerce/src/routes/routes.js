import TransactionController from '../networking/controllers/CommerceController';

const appRouter = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our restful API');
  });

  app.post('/Transaction', async (req, res) => {
    try {
      const { transaction } = req.body;
      const response = await TransactionController.sendTransaction(transaction);
      console.log(response);
      res.status(200).send(
        `Transaction successful 
        Transaction Identifier: ${response.data.id}`,
      );
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });
};

export default appRouter;
