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
      throw new Error(error);
    }

    try {
      transmitterResponse = await TransmitterController.communicateWithTransmitter(
        req,
        res,
      );
    } catch (error) {
      await this.rollbackGateway(gatewayResponse);
      await this.rollbackNetwork(networkResponse);
      throw new Error(error);
    }

    try {
      transactionResponse = await DatabaseManager.saveTransaction(
        gatewayResponse,
        transmitterResponse,
        networkResponse,
      );
    } catch (error) {
      await this.rollbackGateway(gatewayResponse);
      await this.rollbackNetwork(networkResponse);
      await this.rollbackTransmitter(transactionResponse);
      throw new Error(error);
    }

    return transactionResponse;
  };

  rollbackGateway = async gatewayResponse => {
    try {
      await GatewayController.deleteTransaction(gatewayResponse);
    } catch (error) {
      throw new Error(error);
    }
  };

  rollbackNetwork = async networkResponse => {
    try {
      await NetworkController.deleteTransaction(networkResponse);
    } catch (error) {
      throw new Error(error);
    }
  };

  rollbackTransmitter = async transmitterResponse => {
    try {
      await TransmitterController.deleteTransaction(transmitterResponse);
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default new TransactionController();
