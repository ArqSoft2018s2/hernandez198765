import TransactionController from '../networking/controllers/CommerceController';
import DatabaseManager from '../managers/DatabaseManager';

const appRouter = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our restful API');
  });

  app.post('/Transaction', async (req, res) => {
    try {
      const { transaction } = req.body;
      await TransactionController.sendTransaction(transaction);
      DatabaseManager.sendNewTransaction(transaction, (status, message) =>
        res.status(status).send(`Transaction Number: ${message.id}`),
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

export default appRouter;
