import dotenv from 'dotenv';
import moment from 'moment';
import DatabaseManager from '../../managers/DatabaseManager';
// import HttpService from '../HttpService';

class NetworkController {
  constructor() {
    dotenv.config();
    this.FRAUD_LIMIT = process.env.FRAUD_LIMIT;
    this.BASE_API = '/Network';
  }

  fraudControl = transaction => {
    const {
      card: { number },
    } = transaction;
    const today = moment.unix();
    const threeDaysAgo = moment()
      .add(-3, 'days')
      .unix();
    DatabaseManager.getQuantityOfTransactionsBetweenHours(
      number,
      (status, collection) => {
        console.log(collection);
      },
    );
  };
}

export default new NetworkController();
