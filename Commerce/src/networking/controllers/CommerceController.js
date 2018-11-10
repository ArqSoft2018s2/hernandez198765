import HttpService from '../HttpService';
import Gateways from '../../helpers/Gateways';

class TransactionController {
  constructor() {
    this.BASE_API = '/Transaction';
  }

  getTransaction = (params = {}) => HttpService.get(this.BASE_API, params);

  getGatewayFromCategory = transaction => {
    const {
      product: { category },
    } = transaction;
    return { ...transaction, gateway: this.findGateway(category) };
  };

  findGateway = category => {
    if (Gateways[category]) {
      return Gateways[category];
    }
    throw new Error('Error: We cant find a gateway to process this product');
  };

  sendTransaction = async newTransaction => {
    try {
      const transactionWithGateway = this.getGatewayFromCategory(
        newTransaction,
      );
      const response = await HttpService.post(
        this.BASE_API,
        transactionWithGateway,
      );
      return response;
    } catch (error) {
      const message = error.response ? error.response.data : error.message;
      throw new Error(message);
    }
  };

  deleteTransaction = async transactionId => {
    const uri = `${this.BASE_API}/${transactionId}`;
    await HttpService.delete(uri);
  };

  chargeback = async transactionToChargeback => {
    const uri = `${this.BASE_API}`;
    const transmitterResponse = await HttpService.put(
      uri,
      transactionToChargeback,
    );
    return transmitterResponse.data;
  };
}

export default new TransactionController();
