import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';
import GatewayController from './GatewayController';
import NetworkController from './NetworkController';
import TransmitterController from './TransmitterController';

class TransactionController {
  constructor() {
    this.BASE_API = '/Transaction';
    this.paymentResponse = `Commerce starts communication`;
  }

  communicateWithTransmitter = async (req, res) => {
    try {
      const url = `${apiConstants.TRANSMITTER_API}/test`;
      const transmitterResponse = await HttpService.get(url);
      this.paymentResponse = `${this.paymentResponse}
                         ${transmitterResponse.data}`;
      res.status(200).send(this.paymentResponse);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  communicateWithNetwork = async (req, res) => {
    try {
      const url = `${apiConstants.NETWORK_API}/test`;
      const networkResponse = await HttpService.get(url);
      this.paymentResponse = `${this.paymentResponse}
                         ${networkResponse.data}`;
      this.communicateWithTransmitter(req, res);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  communicateWithGateway = async (req, res) => {
    try {
      const url = `${apiConstants.GATEWAY_API}/test`;
      const gatewayResponse = await HttpService.get(url);
      this.paymentResponse = `${this.paymentResponse}
                         ${gatewayResponse.data}`;
      this.communicateWithNetwork(req, res);
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  makeCommunications = async (req, res) => {
    // TODO: ask about the promise chain..
    try {
      const gatewayResponse = await GatewayController.communicateWithGateway(
        req,
        res,
      );
      const networkResponse = await NetworkController.communicateWithNetwork(
        req,
        res,
      );
      const transmitterResponse = await TransmitterController.communicateWithTransmitter(
        req,
        res,
      );
      const transactionResponse = `${gatewayResponse} 
                                   ${networkResponse}
                                   ${transmitterResponse}`;
      res.status(200).send(transactionResponse);
    } catch (error) {
      res.status(400).send('Error');
    }
  };
}

export default new TransactionController();
