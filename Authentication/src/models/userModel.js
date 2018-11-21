import mongoose from 'mongoose';
import userSchema from './schemas/userSchema';

export default mongoose.model('Users', userSchema);
