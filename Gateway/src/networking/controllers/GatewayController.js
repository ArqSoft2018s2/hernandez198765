// import HttpService from '../HttpService';
import CreditCards from '../../helpers/CreditCards';

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

  identifyNetwork = transaction => {
    try {
      return {
        ...transaction,
        network: this.getNetworkFromCreditCard(transaction),
      };
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default new GatewayController();
