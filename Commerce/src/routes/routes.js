import TransactionController from '../networking/controllers/TransactionController';
import DatabaseManager from '../managers/DatabaseManager';

const appRouter = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our restful API');
  });

  app.post('/Transaction', (req, res) => {
    const { transaction } = req.body;
    TransactionController.sendTransaction(transaction)
      .then(() => {
        DatabaseManager.sendNewTransaction(transaction, (status, message) =>
          res.status(status).send(`Transaction Number: ${message.id}`),
        );
      })
      .catch(error => res.status(500).send(error.message));
  });
};

export default appRouter;
