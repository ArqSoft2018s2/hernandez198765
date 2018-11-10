import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';
import DatabaseManager from '../../managers/DatabaseManager';

class GatewayController {
  getGateways = async () => {
    const gateways = await DatabaseManager.getGateways();
    return gateways;
  };

  communicateWithGateway = async req => {
    const gatewayToCommunicate = this.obtainGateway(req.body);
    console.log(gatewayToCommunicate);
    const uri = `${apiConstants.GATEWAY_API}/Gateway`;
    const gatewayResponse = await HttpService.post(uri, req.body);
    return gatewayResponse.data;
  };

  deleteTransaction = async transactionId => {
    const uri = `${apiConstants.GATEWAY_API}/Gateway/${transactionId}`;
    const gatewayResponse = await HttpService.delete(uri);
    return gatewayResponse.data;
  };

  obtainGateway = transaction => {
    if (!transaction.gateway) return 'No gateway specified';
    // TODO: go to database and get gateway route, etc..
    return transaction.gateway;
  };

  batchClosingTransaction = async (RUT, startDate, endDate) => {
    const uri = `${
      apiConstants.GATEWAY_API
    }/Gateway?RUT=${RUT}&startDate=${startDate}&endDate=${endDate}`;
    const gatewayResponse = await HttpService.get(uri);
    return gatewayResponse.data;
  };
}

export default new GatewayController();
