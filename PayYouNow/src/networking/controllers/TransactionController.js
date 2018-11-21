import GatewayController from './GatewayController';
import NetworkController from './NetworkController';
import TransmitterController from './TransmitterController';
import DatabaseManager from '../../managers/DatabaseManager';
import LoggerController from './LoggerController';

class TransactionController {
  constructor() {
    this.paymentResponse = `Commerce starts communication`;
  }

  makeTransaction = async (req, res) => {
    await this.makeCommunications(req, res);
  };

  makeCommunications = async (req, res) => {
    let networkResponse;
    let transmitterResponse;
    let transactionResponse;
    let gatewayResponse;

    try {
      LoggerController.registerLog('Start communication with Gateway');
      gatewayResponse = await GatewayController.communicateWithGateway(
        req,
        res,
      );
    } catch (error) {
      throw new Error(error.response.data);
    }
    gatewayResponse = { ...gatewayResponse, gateway: req.body.gateway };
    req.body = { ...req.body, network: gatewayResponse.network };
    try {
      LoggerController.registerLog('Start communication with Network');
      networkResponse = await NetworkController.communicateWithNetwork(
        req,
        res,
      );
    } catch (error) {
      LoggerController.registerLog('Rollback changes');
      await this.rollbackGateway(gatewayResponse.id);
      throw new Error(error.response.data);
    }
    networkResponse = { ...networkResponse, network: req.body.network };
    req.body = { ...req.body, transmitter: networkResponse.transmitter };
    try {
      LoggerController.registerLog('Start communication with Transmitter');
      transmitterResponse = await TransmitterController.communicateWithTransmitter(
        req,
        res,
      );
    } catch (error) {
      LoggerController.registerLog('Rollback changes');
      await this.rollbackGateway(gatewayResponse.id);
      await this.rollbackNetwork(networkResponse.id);
      throw new Error(error.response.data);
    }
    transmitterResponse = {
      ...transmitterResponse,
      transmitter: networkResponse.transmitter,
    };
    try {
      LoggerController.registerLog('Saving Transaction');
      transactionResponse = await DatabaseManager.saveTransaction(
        req.body.RUT,
        gatewayResponse,
        networkResponse,
        transmitterResponse,
      );
    } catch (error) {
      LoggerController.registerError(error);
      LoggerController.registerLog('Rollback changes');
      await this.rollbackGateway(gatewayResponse.id);
      await this.rollbackNetwork(networkResponse.id);
      await this.rollbackTransmitter(transactionResponse.id);
      throw new Error(error);
    }
    return transactionResponse;
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
