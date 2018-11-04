import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class NetworkController {
  communicateWithNetwork = async req => {
    const url = `${apiConstants.NETWORK_API}/Network`;
    const transaction = req.body;
    const networkResponse = await HttpService.post(url, transaction);
    return networkResponse.data;
  };

  deleteTransaction = async req => {
    const transaction = req.id;
    const url = `${apiConstants.NETWORK_API}/Network/${transaction}`;
    const networkResponse = await HttpService.delete(url);
    return networkResponse.data;
  };
}

export default new NetworkController();
