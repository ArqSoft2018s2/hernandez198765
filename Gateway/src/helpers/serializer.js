const serializer = transaction => ({
  amount: transaction.amount,
  RUT: transaction.RUT,
  date: transaction.date,
});

export default serializer;
