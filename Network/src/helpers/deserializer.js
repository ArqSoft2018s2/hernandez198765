const deserializer = (response, transmitterResponse, transmitter) => ({
  networkId: response.id,
  ...transmitterResponse,
  transmitter,
});

export default deserializer;
