import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';
import DatabaseManager from '../../managers/DatabaseManager';

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

  obtainNetwork = async networkName => {
    if (!networkName) {
      throw new Error('No network specified');
    }
    const network = await DatabaseManager.getNetworkByName(networkName);
    return network.url;
  };
}

export default new NetworkController();
