import CreditCards from '../../helpers/CreditCards';
import DatabaseManager from '../../managers/DatabaseManager';

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
      const network = this.getNetworkFromCreditCard(transaction);
      const databaseIDTransaction = await DatabaseManager.saveTransaction(
        transaction,
      );
      return {
        ...databaseIDTransaction,
        network,
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  returnPurchase = async transactionId => {
    await DatabaseManager.deleteTransaction(transactionId);
  };
}

export default new GatewayController();
