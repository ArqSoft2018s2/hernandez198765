import moment from 'moment';
import transactionStatus from './transactionStatus';

class Serializer {
  serializeTransaction = (RUT, gateway, network, transmitter) => ({
    RUT,
    gateway: {
      idGateway: gateway.gateway,
      idTransaction: gateway.id,
    },
    network: {
      idNetwork: network.network,
      idTransaction: network.id,
    },
    transmitter: {
      idTransmitter: transmitter.transmitter,
      idTransaction: transmitter.id,
    },
    status: transactionStatus.OK,
  });

  serializeRequest = (transaction, methodType, methods) => {
    const methodRequested = methods.filter(
      method => method.name.toLowerCase() === methodType.toLowerCase(),
    );
    const { params, apiResource } = methodRequested[0];
    if (params.length !== 0) {
      const body = params.reduce((accum, param) => {
        switch (param.type) {
          case 'Date':
            if (param.format.toLowerCase() === 'epoch') {
              // eslint-disable-next-line no-param-reassign
              accum[param.name] = transaction[param.name];
            } else {
              // eslint-disable-next-line no-param-reassign
              accum[param.name] = {
                ...moment(transaction[param.name]).format(param.format),
              };
            }
            break;
          case 'Object':
            // eslint-disable-next-line no-param-reassign
            accum[param.name] = { ...transaction[param.name] };
            break;
          default:
            // eslint-disable-next-line no-param-reassign
            accum[param.name] = transaction[param.name];
            break;
        }
        return { ...accum };
      }, {});
      return { body, apiResource };
    }
    return { apiResource };
  };
}

export default new Serializer();
