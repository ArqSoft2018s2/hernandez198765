import TransactionController from '../networking/controllers/TransactionController';
import GatewayController from '../networking/controllers/GatewayController';
import LoggerController from '../networking/controllers/LoggerController';
import NetworkController from '../networking/controllers/NetworkController';
import TransmitterController from '../networking/controllers/TransmitterController';

const appRouter = app => {
  app.get('/Transaction', async (req, res) => {
    try {
      const { RUT, startDate, endDate } = req.query;
      const response = await TransactionController.batchClosingTransaction(
        RUT,
        startDate,
        endDate,
      );
      res.status(200).send(response);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.post('/Transaction', async (req, res) => {
    try {
      const response = await TransactionController.initialCommunications(
        req,
        res,
      );
      res.status(200).send(response);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.post('/Transaction/Network', async (req, res) => {
    try {
      const response = await TransactionController.communicateWithNetwork(
        req,
        res,
      );
      res.status(200).send(response);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.post('/Transaction/Transmitter', async (req, res) => {
    try {
      const response = await TransactionController.communicateWithTransmitter(
        req,
        res,
      );
      res.status(200).send(response);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.delete('/Transaction/:transactionId', async (req, res) => {
    try {
      const { transactionId } = req.params;
      const response = await TransactionController.returnPurchase(
        transactionId,
      );
      res.status(200).send(response);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.put('/Transaction', async (req, res) => {
    try {
      const { transactionId } = req.body;
      const response = await TransactionController.chargeback(transactionId);
      res.status(200).send(response);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.get('/Gateway', async (req, res) => {
    try {
      const response = await GatewayController.getGateways();
      res.status(200).send(response);
    } catch (error) {
      LoggerController.registerError(error);
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.post('/Gateway', async (req, res) => {
    try {
      const gateway = req.body;
      await GatewayController.saveGateway(gateway);
      res.status(200).send(`${gateway.name} registered succesfully`);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : 'Error: Cant register gateway';
      res.status(500).send(errorResponse);
    }
  });

  app.post('/Network', async (req, res) => {
    try {
      const network = req.body;
      await NetworkController.saveNetwork(network);
      res.status(200).send(`Network registered succesfully`);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : 'Error: Cant register network';
      res.status(500).send(errorResponse);
    }
  });

  app.post('/Transmitter', async (req, res) => {
    try {
      const transmitter = req.body;
      await TransmitterController.saveTransmitter(transmitter);
      res.status(200).send(`Transmitter registered succesfully`);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : 'Error: cant register transmitter';
      res.status(500).send(errorResponse);
    }
  });
};

export default appRouter;
