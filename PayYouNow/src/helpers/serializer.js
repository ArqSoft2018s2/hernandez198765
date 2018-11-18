import moment from 'moment';

class Serializer {
  serializeTransaction = (gateway, network, transmitter) => ({
    gatewayId: gateway.id,
    networkId: network.id,
    transmitterId: transmitter.id,
  });

  serializeRequest = (transaction, methodType, methods) => {
    const methodRequested = methods.filter(
      method => method.name.toLowerCase() === methodType,
    );
    const { params } = methodRequested[0];
    if (params.length !== 0) {
      const body = params.reduce((accum, param) => {
        if (param.type === 'Date') {
          if (param.format === 'epoch') {
            // eslint-disable-next-line no-param-reassign
            accum[param.name] = { ...moment(transaction[param.name]).unix() };
          }
          // eslint-disable-next-line no-param-reassign
          accum[param.name] = {
            ...moment(transaction[param.name]).format(param.format),
          };
        }
        if (param.type === 'Object') {
          // eslint-disable-next-line no-param-reassign
          accum[param.name] = { ...transaction[param.name] };
        }
        // eslint-disable-next-line no-param-reassign
        accum[param.name] = transaction[param.name];
        return { ...accum };
      }, {});
      return body;
    }
    return undefined;
  };
}

export default new Serializer();
