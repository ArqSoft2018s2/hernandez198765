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
          res.status(status).send(message),
        );
      })
      .catch(error => {
        console.log(error.message);
        res.status(500).send(error.message);
      });
  });
};

export default appRouter;
