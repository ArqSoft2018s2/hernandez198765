import HttpService from '../HttpService';
import DatabaseManager from '../../managers/DatabaseManager';
import LoggerController from './LoggerController';
import Serializer from '../../helpers/Serializer';

class GatewayController {
  getGateways = async () => {
    LoggerController.registerLog('Start getting gateways');
    const gateways = await DatabaseManager.getGateways();
    return gateways;
  };

  communicateWithGateway = async req => {
    const gatewayToCommunicate = await this.obtainGateway(req.body, 'post');
    const { url, apiResource, body } = gatewayToCommunicate;
    const uri = `${url}${apiResource}`;
    await HttpService.setDefaultHeaders();
    const gatewayResponse = await HttpService.post(uri, body);
    return gatewayResponse.data;
  };

  deleteTransaction = async params => {
    const gatewayToCommunicate = await this.obtainGateway(params, 'Delete');
    const { url, apiResource, body } = gatewayToCommunicate;
    const uri = `${url}${apiResource}/${body.id}`;
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
    return {
      url: gateway.url,
      body: requestBody.body,
      apiResource: requestBody.apiResource,
    };
  };

  batchClosingTransaction = async params => {
    const gatewayToCommunicate = await this.obtainGateway(params, 'get');
    const { url, apiResource, body } = gatewayToCommunicate;
    const uri = `${url}${apiResource}?RUT=${body.RUT}&startDate=${
      body.startDate
    }&endDate=${body.endDate}`;
    await HttpService.setDefaultHeaders();
    const gatewayResponse = await HttpService.get(uri);
    return gatewayResponse.data;
  };

  saveGateway = async gateway => {
    await DatabaseManager.saveGateway(gateway);
  };
}

export default new GatewayController();
