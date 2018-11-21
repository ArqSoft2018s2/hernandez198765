const deserializer = (response, transmitter) => ({
  id: response.id,
  transmitter,
});

export default deserializer;
