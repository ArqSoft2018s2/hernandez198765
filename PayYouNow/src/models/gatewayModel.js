import mongoose from 'mongoose';
import gatewaySchema from './schemas/gatewaySchema';

export default mongoose.model('Gateway', gatewaySchema);
