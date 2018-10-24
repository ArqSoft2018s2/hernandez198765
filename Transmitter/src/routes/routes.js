import TransmitterController from '../networking/controllers/TransmitterController';

const appRouter = app => {
  app.get('/test', (req, res) => {
    res.status(200).send('Communicate with Transmitter successful');
  });

  app.post('/Card', async (req, res) => {
    try {
      const newCard = req.body;
      await TransmitterController.addNewCard(newCard);
      res.status(200).send('Add new card succesfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

export default appRouter;
