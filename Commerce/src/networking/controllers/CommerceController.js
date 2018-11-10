import moment from 'moment';
import HttpService from '../HttpService';

class TransactionController {
  constructor() {
    this.BASE_API = '/Transaction';
  }

  getTransaction = (params = {}) => HttpService.get(this.BASE_API, params);

  getGatewayFromCategory = async transaction => {
    const {
      product: { category },
    } = transaction;
    return { ...transaction, gateway: await this.findGateway(category) };
  };

  findGateway = async category => {
    const gateways = await this.getGateways();
    const gatewayIndex = gateways.findIndex(
      gatewayElement => gatewayElement.category === category,
    );
    if (gatewayIndex === -1) {
      throw new Error('Error: We cant find a gateway to process this product');
    }
    return gateways[gatewayIndex].name;
  };

  getGateways = async () => {
    try {
      const uri = '/Gateway';
      const response = await HttpService.get(uri);
      return response.data;
    } catch (error) {
      const message = error.response ? error.response.data : error.message;
      throw new Error(message);
    }
  };

  sendTransaction = async newTransaction => {
    try {
      const transactionWithGateway = await this.getGatewayFromCategory(
        newTransaction,
      );
      const response = await HttpService.post(this.BASE_API, {
        ...transactionWithGateway,
        date: moment().unix(),
      });
      return response.data;
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

  batchClosingTransaction = async (RUT, startDate, endDate) => {
    const startDateEpoch = moment(startDate).unix();
    const endDateEpoch = moment(endDate).unix();
    const uri = `${
      this.BASE_API
    }?RUT=${RUT}&startDate=${startDateEpoch}&endDate=${endDateEpoch}`;
    const response = await HttpService.get(uri);
    return response.data;
  };
}

export default new TransactionController();
