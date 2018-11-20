import HttpService from '../HttpService';
import DatabaseManager from '../../managers/DatabaseManager';
import Serializer from '../../helpers/serializer';

// TODO: Add logger controller (?);
class TransmitterController {
  communicateWithTransmitter = async req => {
    const transmitterToCommunicate = this.obtainTransmitter(req.body, 'Post');
    console.log(transmitterToCommunicate);
    const { url, apiResource, body } = transmitterToCommunicate;
    const uri = `${url}${apiResource}`;
    await HttpService.setDefaultHeaders();
    const transmitterResponse = await HttpService.post(uri, body);
    return transmitterResponse.data;
  };

  deleteTransaction = async params => {
    const transmitterToCommunicate = this.obtainTransmitter(params, 'Delete');
    console.log(transmitterToCommunicate);
    const { url, apiResource, body } = transmitterToCommunicate;
    const uri = `${url}${apiResource}/${body.idTransaction}`;
    await HttpService.setDefaultHeaders();
    const transmitterResponse = await HttpService.delete(uri);
    return transmitterResponse.data;
  };

  chargeback = async params => {
    const transmitterToCommunicate = this.obtainTransmitter(params, 'Put');
    console.log(transmitterToCommunicate);
    const { url, apiResource, body } = transmitterToCommunicate;
    const uri = `${url}${apiResource}`;
    await HttpService.setDefaultHeaders();
    const transmitterResponse = await HttpService.put(uri, body);
    return transmitterResponse.data;
  };

  obtainTransmitter = async (transaction, methodType) => {
    if (!transaction && transaction.transmitter) {
      throw new Error('No transmitter specified');
    }
    const transmitter = await DatabaseManager.getTransmitterByName(
      transaction.transmitter,
    );
    const requestBody = Serializer.serializeRequest(
      transaction,
      methodType,
      transmitter.methods,
    );
    return {
      url: transmitter.url,
      body: requestBody.body,
      apiResource: requestBody.apiResource,
    };
  };
}

export default new TransmitterController();
