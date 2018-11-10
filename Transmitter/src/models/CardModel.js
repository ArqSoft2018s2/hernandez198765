import mongoose from 'mongoose';
import CardSchema from './schemas/CardSchema';

export default mongoose.model('Cards', CardSchema);
