import moment from 'moment';
import HttpService from '../HttpService';
import LoggerController from './LoggerController';

class TransactionController {
  constructor() {
    this.BASE_API = '/Transaction';
  }

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
      LoggerController.registerError(error);
      const message = error.response ? error.response.data : error.message;
      throw new Error(message);
    }
  };

  sendTransaction = async newTransaction => {
    try {
      LoggerController.registerLog(
        'Start communication with payYouNow to send transaction',
      );
      const transactionWithGateway = await this.getGatewayFromCategory(
        newTransaction,
      );
      const response = await HttpService.post(this.BASE_API, {
        ...transactionWithGateway,
        date: moment().unix(),
      });
      LoggerController.registerLog('End communication with PayYouNow');
      return response.data;
    } catch (error) {
      LoggerController.registerError(error);
      const message = error.response ? error.response.data : error.message;
      throw new Error(message);
    }
  };

  deleteTransaction = async transactionId => {
    const uri = `${this.BASE_API}/${transactionId}`;
    await HttpService.delete(uri);
  };

  chargeback = async transactionToChargeback => {
    try {
      LoggerController.registerLog(
        'Start communication with payYouNow to chargeback',
      );
      const uri = `${this.BASE_API}`;
      const transmitterResponse = await HttpService.put(
        uri,
        transactionToChargeback,
      );
      LoggerController.registerLog('End communication with PayYouNow');
      return transmitterResponse.data;
    } catch (error) {
      LoggerController.registerError(error);
      const message = error.response ? error.response.data : error.message;
      throw new Error(message);
    }
  };

  batchClosingTransaction = async (RUT, startDate, endDate) => {
    try {
      LoggerController.registerLog(
        'Start communication with payYouNow for batchClosingTransaction',
      );
      const startDateEpoch = moment(startDate).unix();
      const endDateEpoch = moment(endDate).unix();
      const uri = `${
        this.BASE_API
      }?RUT=${RUT}&startDate=${startDateEpoch}&endDate=${endDateEpoch}`;
      const response = await HttpService.get(uri);
      LoggerController.registerLog('End communication with PayYouNow');
      return response.data;
    } catch (error) {
      LoggerController.registerError(error);
      const message = error.response ? error.response.data : error.message;
      throw new Error(message);
    }
  };
}

export default new TransactionController();
