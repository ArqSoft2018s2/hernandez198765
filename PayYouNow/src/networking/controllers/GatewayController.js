import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class GatewayController {
  communicateWithGateway = async req => {
    const gatewayToCommunicate = this.obtainGateway(req.body);
    console.log(gatewayToCommunicate);
    const url = `${apiConstants.GATEWAY_API}/Gateway`;
    const gatewayResponse = await HttpService.post(url, req.body);
    return gatewayResponse.data;
  };

  deleteTransaction = async req => {
    // const transaction = req.id;
    // const url = `${apiConstants.GATEWAY_API}/Gateway/${transaction}`;
    // const gatewayResponse = await HttpService.delete(url);
    // return gatewayResponse.data;
    // TODO: a borrar;
    return true;
  };

  obtainGateway = transaction => {
    if (!transaction.gateway) return 'No gateway specified';
    // TODO: go to database and get gateway route, etc..
    return transaction.gateway;
  };
}

export default new GatewayController();
