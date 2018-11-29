import HttpService from '../HttpService';
import DatabaseManager from '../../managers/DatabaseManager';
import Serializer from '../../helpers/Serializer';

class TransmitterController {
  communicateWithTransmitter = async req => {
    const transmitterToCommunicate = await this.obtainTransmitter(
      req.body,
      'Post',
    );
    const { url, apiResource, body } = transmitterToCommunicate;
    const uri = `${url}${apiResource}`;
    await HttpService.setDefaultHeaders();
    const transmitterResponse = await HttpService.post(uri, body);
    return transmitterResponse.data;
  };

  deleteTransaction = async params => {
    const transmitterToCommunicate = await this.obtainTransmitter(
      params,
      'Delete',
    );
    const { url, apiResource, body } = transmitterToCommunicate;
    const uri = `${url}${apiResource}/${body.id}`;
    await HttpService.setDefaultHeaders();
    const transmitterResponse = await HttpService.delete(uri);
    return transmitterResponse.data;
  };

  chargeback = async params => {
    const transmitterToCommunicate = await this.obtainTransmitter(
      params,
      'Put',
    );
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

  saveTransmitter = async transmitter => {
    await DatabaseManager.saveTransmitter(transmitter);
  };
}

export default new TransmitterController();
