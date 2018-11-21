import CreditCards from '../../helpers/CreditCards';
import DatabaseManager from '../../managers/DatabaseManager';
import LoggerController from './LoggerController';

class GatewayController {
  constructor() {
    this.BASE_API = '/Gateway';
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
    throw new Error('Invalid Credit Card');
  };

  identifyNetwork = async transaction => {
    try {
      LoggerController.registerLog('Identifing Network');
      const network = this.getNetworkFromCreditCard(transaction);
      const databaseIDTransaction = await DatabaseManager.saveTransaction(
        transaction,
      );
      return {
        ...databaseIDTransaction,
        network,
      };
    } catch (error) {
      LoggerController.registerError(error);
      throw new Error(error);
    }
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
