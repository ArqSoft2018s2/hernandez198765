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

  // TODO: Change about keeping the card number, we can find the balance only with the transaction id.
  // need to test it.
  app.post('/Transmitter', async (req, res) => {
    try {
      const { card, amount } = req.body;
      const validationResponse = await TransmitterController.validateCard(card);
      const transactionId = await TransmitterController.addNewTransaction(
        req.body,
      );
      await TransmitterController.updateCardBalance(card, amount);
      res.status(200).send({ ...validationResponse, id: transactionId });
    } catch (error) {
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
      const transactionId = req.body;
      await TransmitterController.chargebackPurchase(transactionId);
      res.status(200).send('Chargeback transaction');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

export default appRouter;
