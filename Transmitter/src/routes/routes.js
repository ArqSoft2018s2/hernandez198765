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
      const { card } = req.body;
      const validationResponse = await TransmitterController.validateCard(card);
      const transactionId = await TransmitterController.updateCardTransactions(
        req.body,
      );
      await TransmitterController.updateCardBalance(req.body);
      res.status(200).send({ ...validationResponse, id: transactionId });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // TODO: With the changes of only find the card by the transaction id
  // ill only need one parameter.
  app.delete(
    '/Transmitter/:transactionId/:transmitterTransactionID',
    async (req, res) => {
      try {
        const { transmitterTransactionID, transactionId } = req.params;
        await TransmitterController.returnPurchase(
          transactionId,
          transmitterTransactionID,
        );
        res.status(200).send('Transaction returned');
      } catch (error) {
        res.status(500).send(error.message);
      }
    },
  );

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
