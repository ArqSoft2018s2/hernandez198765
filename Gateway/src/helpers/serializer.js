import status from './status';

const serializer = transaction => ({
  amount: transaction.amount,
  RUT: transaction.RUT,
  date: transaction.date,
  status: status.OK,
});

export default serializer;
