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
      const { card } = req.body;
      const validationResponse = await TransmitterController.validateCard(card);
      const transactionId = await TransmitterController.updateCardTransactions(
        req.body,
      );
      await TransmitterController.updateCardBalance(req.body);
      res.status(200).send({ ...validationResponse, transactionId });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete('/Transmitter/:transactionId/:amount', async (req, res) => {
    try {
      const { amount, transactionId } = req.params;
      await TransmitterController.returnPurchase(transactionId, amount);
      res.status(200).send('Transaction returned');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.update('/Transmitter', async (req, res) => {
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
