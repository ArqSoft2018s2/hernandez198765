import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class NetworkController {
  communicateWithNetwork = async req => {
    const url = `${apiConstants.NETWORK_API}/Network`;
    const transaction = req.body;
    await HttpService.setDefaultHeaders();
    const networkResponse = await HttpService.post(url, transaction);
    return networkResponse.data;
  };

  deleteTransaction = async transactionId => {
    const url = `${apiConstants.NETWORK_API}/Network/${transactionId}`;
    await HttpService.setDefaultHeaders();
    const networkResponse = await HttpService.delete(url);
    return networkResponse.data;
  };
}

export default new NetworkController();
