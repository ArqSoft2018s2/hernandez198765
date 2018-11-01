import dotenv from 'dotenv';
import moment from 'moment';
import DatabaseManager from '../../managers/DatabaseManager';

class NetworkController {
  constructor() {
    dotenv.config();
    this.FRAUD_LIMIT = JSON.parse(process.env.FRAUD_LIMIT);
    this.BASE_API = '/Network';
  }

  fraudControl = async transaction => {
    const {
      card: { number },
    } = transaction;
    const today = moment().unix();
    const threeDaysAgo = moment()
      .add(-3, 'days')
      .unix();
    const quantity = await DatabaseManager.getQuantityOfTransactionsBetweenHours(
      number,
      today,
      threeDaysAgo,
    );

    if (quantity + 1 > this.FRAUD_LIMIT) {
      throw new Error('Error: fradulent transaction');
    } else {
      const cardDateTransaction = { cardNumber: number, date: today };
      DatabaseManager.sendCardDateTransaction(cardDateTransaction);
    }
  };
}

export default new NetworkController();
