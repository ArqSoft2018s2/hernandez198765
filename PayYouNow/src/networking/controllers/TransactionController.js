import GatewayController from './GatewayController';
import NetworkController from './NetworkController';
import TransmitterController from './TransmitterController';

class TransactionController {
  constructor() {
    this.paymentResponse = `Commerce starts communication`;
  }

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
