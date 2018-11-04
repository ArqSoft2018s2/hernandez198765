import TransmitterController from '../networking/controllers/TransmitterController';

const appRouter = app => {
  app.post('/Card', async (req, res) => {
    try {
      const newCard = req.body;
      await TransmitterController.addNewCard(newCard);
      res.status(200).send('Add new card succesfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.post('/Transmitter', async (req, res) => {
    try {
      const card = req.body;
      const validationResponse = await TransmitterController.validateCard(card);
      await TransmitterController.updateCardBalance(card);
      res.status(200).send(validationResponse);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete('/Transmitter/:transactionId/:amount', async (req, res) => {
    console.log(req.params);
    res.status(200).send('HOLA');
  });
};

export default appRouter;
