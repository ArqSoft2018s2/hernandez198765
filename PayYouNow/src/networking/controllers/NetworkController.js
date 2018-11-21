import HttpService from '../HttpService';
import DatabaseManager from '../../managers/DatabaseManager';
import Serializer from '../../helpers/serializer';

class NetworkController {
  communicateWithNetwork = async req => {
    const networkToCommunicate = await this.obtainNetwork(req.body, 'Post');
    const { url, apiResource, body } = networkToCommunicate;
    const uri = `${url}${apiResource}`;
    await HttpService.setDefaultHeaders();
    const networkResponse = await HttpService.post(uri, body);
    return networkResponse.data;
  };

  deleteTransaction = async params => {
    const networkToCommunicate = await this.obtainNetwork(params, 'Delete');
    const { url, apiResource, body } = networkToCommunicate;
    const uri = `${url}${apiResource}/${body.id}`;
    await HttpService.setDefaultHeaders();
    const networkResponse = await HttpService.delete(uri);
    return networkResponse.data;
  };

  obtainNetwork = async (transaction, methodType) => {
    if (!transaction && !transaction.network) {
      throw new Error('No network specified');
    }
    const network = await DatabaseManager.getNetworkByName(transaction.network);
    const requestBody = Serializer.serializeRequest(
      transaction,
      methodType,
      network.methods,
    );
    return {
      url: network.url,
      body: requestBody.body,
      apiResource: requestBody.apiResource,
    };
  };

  saveNetwork = async network => {
    await DatabaseManager.saveNetwork(network);
  };
}

export default new NetworkController();
