import mongoose from 'mongoose';
import transmitterSchema from './schemas/transmitterSchema';

export default mongoose.model('Transmitter', transmitterSchema);
