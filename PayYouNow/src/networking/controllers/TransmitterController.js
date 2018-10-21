import HttpService from '../HttpService';
import apiConstants from '../../helpers/ApiConstants';

class TransmitterController {
  communicateWithTransmitter = async (req, res) => {
    const url = `${apiConstants.TRANSMITTER_API}/test`;
    const transmitterResponse = await HttpService.get(url);
    return transmitterResponse;
  };
}

export default new TransmitterController();
