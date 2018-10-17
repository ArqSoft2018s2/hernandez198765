import TransactionController from '../networking/controllers/TransactionController';
// import DatabaseManager from '../managers/DatabaseManager';

const appRouter = app => {
  app.get('/', (req, res) => {
    res.status(200).send('Welcome to our restful API');
  });

  app.post('/Transaction', (req, res) => {
    TransactionController.makeCommunications(req, res);
  });
};

export default appRouter;
