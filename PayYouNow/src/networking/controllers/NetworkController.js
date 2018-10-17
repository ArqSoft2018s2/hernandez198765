import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class NetworkController {
  communicateWithNetwork = async (req, res) => {
    const url = `${apiConstants.NETWORK_API}/test`;
    const networkResponse = await HttpService.get(url);
    return networkResponse;
  };
}

export default new NetworkController();
