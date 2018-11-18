import moment from 'moment';
import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';
import DatabaseManager from '../../managers/DatabaseManager';
import LoggerController from './LoggerController';

class GatewayController {
  getGateways = async () => {
    LoggerController.registerLog('Start getting gateways');
    const gateways = await DatabaseManager.getGateways();
    return gateways;
  };

  communicateWithGateway = async req => {
    const gatewayToCommunicate = await this.obtainGateway(req.body, 'post');
    console.log(gatewayToCommunicate);
    const uri = `${apiConstants.GATEWAY_API}/Gateway`;
    await HttpService.setDefaultHeaders();
    const gatewayResponse = await HttpService.post(uri, req.body);
    return gatewayResponse.data;
  };

  deleteTransaction = async transactionId => {
    const uri = `${apiConstants.GATEWAY_API}/Gateway/${transactionId}`;
    await HttpService.setDefaultHeaders();
    const gatewayResponse = await HttpService.delete(uri);
    return gatewayResponse.data;
  };

  obtainGateway = async (transaction, methodType) => {
    if (!transaction.gateway) {
      throw new Error('No gateway specified');
    }
    const gateway = await DatabaseManager.getGatewayByName(transaction.gateway);
    const requestBody = this.serializeRequestToGateway(
      transaction,
      methodType,
      gateway.methods,
    );
    return { url: gateway.url, bodyParams: requestBody };
  };

  serializeRequestToGateway = (transaction, methodType, methods) => {
    const params = methods.filter(method => method.name === methodType);
    const body = {};
    params.reduce((accum, param) => {
      if (param.type === 'Date') {
        return {
          ...accum,
          ...moment(transaction[param.name]).format(param.format),
        };
      }
      return { ...accum, ...transaction[param.name] };
    }, body);
    console.log(body);
  };

  batchClosingTransaction = async (RUT, startDate, endDate) => {
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
