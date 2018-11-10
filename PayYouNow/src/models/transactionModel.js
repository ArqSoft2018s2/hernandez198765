import mongoose from 'mongoose';
import transactionSchema from './schemas/transactionSchema';

export default mongoose.model('Transaction', transactionSchema);
