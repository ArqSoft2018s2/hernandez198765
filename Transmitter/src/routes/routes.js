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
      console.log('ACA MASCON');
      const { card, amount } = req.body;
      const asda = 123;
      const validationResponse = await TransmitterController.validateCard(
        card,
        amount,
      );
      const transactionId = await TransmitterController.addNewTransaction(
        req.body,
      );
      await TransmitterController.updateCardBalance(card, amount);
      console.log('Balance mejorado');
      res
        .status(200)
        .send({ ...validationResponse, transmitterId: transactionId });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  app.delete('/Transmitter/:transactionId', async (req, res) => {
    try {
      const { transactionId } = req.params;
      await TransmitterController.returnPurchase(transactionId);
      res.status(200).send('Transaction returned');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.put('/Transmitter', async (req, res) => {
    try {
      const { id } = req.body;
      await TransmitterController.chargebackPurchase(id);
      res.status(200).send('Chargeback succesfull');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

export default appRouter;
