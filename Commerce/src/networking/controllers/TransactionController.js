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
    throw new Error('We cant find a gateway to process this product');
  };

  sendTransaction = async newTransaction => {
    try {
      const transactionWithGateway = this.getGatewayFromCategory(
        newTransaction,
      );
      return HttpService.post(this.BASE_API, transactionWithGateway);
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteTransaction = uri => HttpService.delete(uri);

  patchTransaction = (uri, body) => HttpService.patch(uri, body);
}

export default new TransactionController();
