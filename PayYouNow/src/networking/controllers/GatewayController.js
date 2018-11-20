import HttpService from '../HttpService';
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
    const uri = `${gatewayToCommunicate.url}${
      gatewayToCommunicate.apiResource
    }`;
    await HttpService.setDefaultHeaders();
    const gatewayResponse = await HttpService.post(
      uri,
      gatewayToCommunicate.bodyParams,
    );
    return gatewayResponse.data;
  };

  deleteTransaction = async params => {
    const gatewayToCommunicate = this.obtainGateway(params, 'Delete');
    console.log(gatewayToCommunicate);
    const { url, apiResource, body } = gatewayToCommunicate;
    const uri = `${url}/${apiResource}/${body.idTransaction}`;
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
    const gatewayToCommunicate = this.obtainGateway(params, 'get');
    console.log(gatewayToCommunicate);
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
