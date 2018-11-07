import CommerceController from '../networking/controllers/CommerceController';

const appRouter = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our restful API');
  });

  app.post('/Transaction', async (req, res) => {
    try {
      const { transaction } = req.body;
      const response = await CommerceController.sendTransaction(transaction);
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

  app.delete('/Transaction/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await CommerceController.deleteTransaction(id);
      res.status(200).send('Your purchase was returned succesfully');
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });
};

export default appRouter;
