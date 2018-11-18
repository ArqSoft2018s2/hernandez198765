import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';
import DatabaseManager from '../../managers/DatabaseManager';
import LoggerController from './LoggerController';
import Serializer from '../../helpers/serializer';

class GatewayController {
  getGateways = async () => {
    LoggerController.registerLog('Start getting gateways');
    const gateways = await DatabaseManager.getGateways();
    return gateways;
  };

  communicateWithGateway = async req => {
    const gatewayToCommunicate = await this.obtainGateway(req.body, 'post');
    console.log(gatewayToCommunicate);
    const uri = `${gatewayToCommunicate.url}/Gateway`;
    await HttpService.setDefaultHeaders();
    const gatewayResponse = await HttpService.post(
      uri,
      gatewayToCommunicate.bodyParams,
    );
    return gatewayResponse.data;
  };

  deleteTransaction = async (transactionId, url) => {
    const uri = `${apiConstants.GATEWAY_API}/Gateway/${transactionId}`;
    await HttpService.setDefaultHeaders();
    const gatewayResponse = await HttpService.delete(uri);
    return gatewayResponse.data;
  };

  obtainGateway = async (transaction, methodType) => {
    if (!transaction && !transaction.gateway) {
      throw new Error('No gateway specified');
    }
    const gateway = await DatabaseManager.getGatewayByName(transaction.gateway);
    const requestBody = Serializer.serializeRequest(
      transaction,
      methodType,
      gateway.methods,
    );
    return { url: gateway.url, bodyParams: requestBody };
  };

  batchClosingTransaction = async (RUT, startDate, endDate, url) => {
    const uri = `${
      apiConstants.GATEWAY_API
    }/Gateway?RUT=${RUT}&startDate=${startDate}&endDate=${endDate}`;
    await HttpService.setDefaultHeaders();
    const gatewayResponse = await HttpService.get(uri);
    return gatewayResponse.data;
  };

  saveGateway = async gateway => {
    await DatabaseManager.saveGateway(gateway);
  };
}

export default new GatewayController();
