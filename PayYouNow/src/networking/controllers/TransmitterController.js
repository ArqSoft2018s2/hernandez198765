import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class TransmitterController {
  communicateWithTransmitter = async req => {
    const url = `${apiConstants.TRANSMITTER_API}/Transmitter`;
    const transmitterResponse = await HttpService.post(url, req.body.card);
    return transmitterResponse.data;
  };

  deleteTransaction = async req => {
    const transaction = req.id;
    const url = `${apiConstants.TRANSMITTER_API}/Transmitter/${transaction}`;
    const transmitterResponse = await HttpService.delete(url, req.body.card);
    return transmitterResponse.data;
  };
}

export default new TransmitterController();
