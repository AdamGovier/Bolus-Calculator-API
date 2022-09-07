import mongoose from 'mongoose';

// Refresh Token Schema.

const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
    token: {
        required: true, 
        unique: true,
        type: String
    }
})

export default mongoose.model('admin.tokens', refreshTokenSchema);