import GatewayController from './GatewayController';
import NetworkController from './NetworkController';
import TransmitterController from './TransmitterController';
import DatabaseManager from '../../managers/DatabaseManager';

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
    const gatewayResponse = await GatewayController.communicateWithGateway(
      req,
      res,
    );

    try {
      networkResponse = await NetworkController.communicateWithNetwork(
        req,
        res,
      );
    } catch (error) {
      await this.rollbackGateway(gatewayResponse);
      throw new Error(error.response.data);
    }

    try {
      transmitterResponse = await TransmitterController.communicateWithTransmitter(
        req,
        res,
      );
    } catch (error) {
      await this.rollbackGateway(gatewayResponse);
      await this.rollbackNetwork(networkResponse);
      throw new Error(error.response.data);
    }

    // TODO: Change about keeping card number;
    try {
      transactionResponse = await DatabaseManager.saveTransaction(
        gatewayResponse,
        networkResponse,
        transmitterResponse,
      );
    } catch (error) {
      await this.rollbackGateway(gatewayResponse.id);
      await this.rollbackNetwork(networkResponse.id);
      await this.rollbackTransmitter(transactionResponse.number);
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
      const transaction = await DatabaseManager.getTransactionFromDatabase(
        transactionId,
      );
      await TransmitterController.deleteTransaction(
        transaction.transmitterId,
        transaction.transmitterTransactionId,
      );
      await NetworkController.deleteTransaction(transaction.networkId);
      await GatewayController.deleteTransaction(transaction.gatewayId);
    } catch (error) {
      throw new Error(error.response.data);
    }
  };

  chargeback = async transactionToChargeback => {
    try {
      const response = await TransmitterController.chargeback(
        transactionToChargeback,
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data);
    }
  };
}

export default new TransactionController();
