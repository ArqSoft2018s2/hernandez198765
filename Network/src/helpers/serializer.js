import status from './status';

const serializer = (number, today) => ({
  cardNumber: number,
  date: today,
  status: status.OK,
});

export default serializer;
