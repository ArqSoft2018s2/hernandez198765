import mongoose from 'mongoose';
import CardSchema from './CardSchema';

export default mongoose.model('Cards', CardSchema);
