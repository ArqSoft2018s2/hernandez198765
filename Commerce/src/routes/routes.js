import TransactionController from '../networking/controllers/CommerceController';
import DatabaseManager from '../managers/DatabaseManager';

const appRouter = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our restful API');
  });

  app.post('/Transaction', async (req, res) => {
    try {
      const { transaction } = req.body;
      const response = await TransactionController.sendTransaction(transaction);
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

export default appRouter;
