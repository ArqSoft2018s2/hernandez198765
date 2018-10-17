import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class GatewayController {
  communicateWithGateway = async (req, res) => {
    const gatewayToCommunicate = this.obtainGateway(req.body);
    const url = `${apiConstants.GATEWAY_API}/test`;
    const gatewayResponse = await HttpService.get(url);
    return gatewayResponse;
  };

  obtainGateway = transaction => {
    if (!transaction.product.gateway) return 'No gateway specified';
    //TODO: go to database and get gateway route, etc..
    return transaction.product.gateway;
  };
}

export default new GatewayController();
