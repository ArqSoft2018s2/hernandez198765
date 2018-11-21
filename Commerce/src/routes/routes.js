import CommerceController from '../networking/controllers/CommerceController';

const appRouter = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our restful API');
  });

  app.get('/Transaction', async (req, res) => {
    try {
      const { RUT, startDate, endDate } = req.query;
      const response = await CommerceController.batchClosingTransaction(
        RUT,
        startDate,
        endDate,
      );
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.post('/Transaction', async (req, res) => {
    try {
      const { transaction } = req.body;
      const response = await CommerceController.sendTransaction(transaction);
      res.status(200).send(
        `Transaction successful 
        Transaction Identifier: ${response.id}`,
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

  app.put('/Transaction', async (req, res) => {
    try {
      const transactionToChargeback = req.body;
      const response = await CommerceController.chargeback(
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
