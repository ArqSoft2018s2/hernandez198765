import mongoose from 'mongoose';
import networkSchema from './schemas/networkSchema';

export default mongoose.model('Network', networkSchema);
