import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class NetworkController {
  communicateWithNetwork = async (req, res) => {
    const url = `${apiConstants.NETWORK_API}/Network`;
    const transaction = req.body;
    const networkResponse = await HttpService.post(url, transaction);
    return networkResponse;
  };
}

export default new NetworkController();
