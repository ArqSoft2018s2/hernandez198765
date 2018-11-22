import GatewayController from './GatewayController';
import NetworkController from './NetworkController';
import TransmitterController from './TransmitterController';
import DatabaseManager from '../../managers/DatabaseManager';
import LoggerController from './LoggerController';
import Deserializer from '../../helpers/Deserializer';

class TransactionController {
  constructor() {
    this.paymentResponse = `Commerce starts communication`;
  }

  initialCommunications = async (req, res) => {
    try {
      LoggerController.registerLog('Start communication with Gateway');
      const { gateway, RUT } = req.body;
      const transactionCommunications = await this.communicateWithGateway(
        req,
        res,
      );
      const deserializerResponse = Deserializer.deserializeResponse({
        ...transactionCommunications,
        gateway,
        RUT,
      });
      console.log(deserializerResponse);
      const transactionResponse = await this.saveTransactionInPayYouNow(
        deserializerResponse,
      );
      return transactionResponse;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  saveTransactionInPayYouNow = async transactionCommunications => {
    const { gateway, network, transmitter, RUT } = transactionCommunications;
    LoggerController.registerLog('Saving Transaction');
    const transactionResponse = await DatabaseManager.saveTransaction(
      RUT,
      gateway,
      network,
      transmitter,
    );
    return transactionResponse;
  };

  communicateWithGateway = async (req, res) => {
    try {
      LoggerController.registerLog('Start communication with Gateway');
      const transactionCommunications = await GatewayController.communicateWithGateway(
        req,
        res,
      );
      return transactionCommunications;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  communicateWithNetwork = async (req, res) => {
    try {
      LoggerController.registerLog('Start communication with Network');
      const networkResponse = await NetworkController.communicateWithNetwork(
        req,
        res,
      );
      return networkResponse;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  communicateWithTransmitter = async (req, res) => {
    try {
      LoggerController.registerLog('Start communication with Transmitter');
      console.log('ACA MARICA');
      const transmitterResponse = await TransmitterController.communicateWithTransmitter(
        req,
        res,
      );
      return transmitterResponse;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  rollbackGateway = async gatewayResponse => {
    try {
      await GatewayController.deleteTransaction(gatewayResponse);
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  rollbackNetwork = async networkResponse => {
    try {
      await NetworkController.deleteTransaction(networkResponse);
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  rollbackTransmitter = async transmitterResponse => {
    try {
      await TransmitterController.deleteTransaction(transmitterResponse);
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  returnPurchase = async transactionId => {
    try {
      LoggerController.registerLog('Start return purchase');
      const transaction = await DatabaseManager.getTransactionFromDatabase(
        transactionId,
      );
      const { gateway, transmitter, network } = transaction;
      await this.returnPurchaseTransmitter(transmitter);
      await this.returnPurchaseNetwork(network);
      await this.returnPurchaseGateway(gateway);
      await DatabaseManager.deleteTransaction(transactionId);
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  returnPurchaseTransmitter = async transmitter => {
    const { idTransmitter, idTransaction } = transmitter;
    await TransmitterController.deleteTransaction({
      transmitter: idTransmitter,
      id: idTransaction,
    });
  };

  returnPurchaseGateway = async gateway => {
    const { idGateway, idTransaction } = gateway;
    await GatewayController.deleteTransaction({
      gateway: idGateway,
      id: idTransaction,
    });
  };

  returnPurchaseNetwork = async network => {
    const { idNetwork, idTransaction } = network;
    await NetworkController.deleteTransaction({
      network: idNetwork,
      id: idTransaction,
    });
  };

  chargeback = async transactionToChargeback => {
    try {
      LoggerController.registerLog('Start return purchase');
      const transaction = await DatabaseManager.getTransactionFromDatabase(
        transactionToChargeback,
      );
      const {
        transmitter: { idTransmitter, idTransaction },
      } = transaction;
      const response = await TransmitterController.chargeback({
        transmitter: idTransmitter,
        id: idTransaction,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  batchClosingTransaction = async (RUT, startDate, endDate) => {
    try {
      LoggerController.registerLog('Start batch closing transaction');
      const transactionsGateways = await DatabaseManager.getTransactionsGatewaysByRUT(
        parseInt(RUT, 10),
      );
      let batchClosingTransaction = 0;
      await Promise.all(
        transactionsGateways.map(async transactionsGateway => {
          const body = {
            gateway: transactionsGateway,
            RUT,
            startDate,
            endDate,
          };
          const batchClosingResponse = await GatewayController.batchClosingTransaction(
            body,
          );
          batchClosingTransaction += batchClosingResponse[0].batchClosing;
        }),
      );
      return `El cierre de lotes: ${batchClosingTransaction}`;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default new TransactionController();
