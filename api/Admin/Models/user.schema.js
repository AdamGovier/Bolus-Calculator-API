import mongoose from 'mongoose';

// User Schema.

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {required: true, type: String},
    password: {required: true, type: String},
    permisionLevel: {
        required: true, 
        type: String,
        enum: {
            values: ['Admin'],
            message: '{VALUE} is not supported'
        }
    }
})

export default mongoose.model('user', userSchema);