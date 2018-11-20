import HttpService from '../HttpService';
import DatabaseManager from '../../managers/DatabaseManager';
import Serializer from '../../helpers/serializer';

// TODO: Add logger controller (?);
class NetworkController {
  communicateWithNetwork = async req => {
    const networkToCommunicate = this.obtainNetwork(req.body, 'Post');
    console.log(networkToCommunicate);
    const { url, apiResource, body } = networkToCommunicate;
    const uri = `${url}${apiResource}`;
    await HttpService.setDefaultHeaders();
    const networkResponse = await HttpService.post(uri, body);
    return networkResponse.data;
  };

  deleteTransaction = async params => {
    const networkToCommunicate = this.obtainNetwork(params, 'Delete');
    console.log(networkToCommunicate);
    const { url, apiResource, body } = networkToCommunicate;
    const uri = `${url}/${apiResource}/${body.idTransaction}`;
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
}

export default new NetworkController();
