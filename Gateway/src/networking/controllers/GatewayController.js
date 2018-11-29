import dotenv from 'dotenv';
import CreditCards from '../../helpers/CreditCards';
import DatabaseManager from '../../managers/DatabaseManager';
import LoggerController from './LoggerController';
import HttpService from '../HttpService';

class GatewayController {
  constructor() {
    dotenv.config();
    this.BASE_API = '/Transaction/Network';
  }

  getNetworkFromCreditCard = transaction => {
    const {
      card: { number },
    } = transaction;
    if (CreditCards.visaRegEx.test(number)) {
      return 'Visa';
    }
    if (CreditCards.mastercardRegEx.test(number)) {
      return 'MasterCard';
    }
    if (CreditCards.discovRegEx.test(number)) {
      return 'Discover';
    }
    if (CreditCards.amexpRegEx.test(number)) {
      return 'Amex';
    }
    throw new Error('Error: Invalid Credit Card');
  };

  identifyNetwork = async transaction => {
    LoggerController.registerLog('Identifing Network');
    const network = this.getNetworkFromCreditCard(transaction);

    const networkResponse = await this.goToNetwork({
      ...transaction,
      network,
    });

    const databaseIDTransaction = await DatabaseManager.saveTransaction(
      transaction,
    );
    return {
      ...networkResponse,
      gatewayId: databaseIDTransaction.id,
      network,
    };
  };

  goToNetwork = async transaction => {
    const uri = `${this.BASE_API}`;
    await HttpService.setDefaultHeaders();
    const networkResponse = await HttpService.post(uri, transaction);
    return networkResponse.data;
  };

  returnPurchase = async transactionId => {
    await DatabaseManager.deleteTransaction(transactionId);
  };

  batchClosingTransaction = async (RUT, startDate, endDate) => {
    LoggerController.registerLog('Obtaining batch closing transaction');
    const batchClosing = await DatabaseManager.batchClosingTransaction(
      RUT,
      startDate,
      endDate,
    );
    return batchClosing;
  };
}

export default new GatewayController();
