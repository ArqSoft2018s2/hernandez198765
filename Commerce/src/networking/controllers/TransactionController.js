import HttpService from '../HttpService';

class TransactionController {
  constructor() {
    this.BASE_API = '/Transaction';
  }

  getTransaction = (params = {}) => HttpService.get(this.BASE_API, params);

  sendTransaction = newTransaction =>
    HttpService.post(this.BASE_API, newTransaction);

  deleteTransaction = uri => HttpService.delete(uri);

  patchTransaction = (uri, body) => HttpService.patch(uri, body);
}

export default new TransactionController();
