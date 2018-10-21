import NetworkController from '../networking/controllers/NetworkController';

const appRouter = app => {
  app.post('/Network', async (req, res) => {
    try {
      const transaction = req.body;
      await NetworkController.fraudControl(transaction);
      res.status(200).send('Aprobada');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

export default appRouter;
