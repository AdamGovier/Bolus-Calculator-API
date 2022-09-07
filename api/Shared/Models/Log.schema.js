import mongoose from 'mongoose';

// System Log Schema.

const { Schema } = mongoose;

const logSchema = new Schema({
    errorCode: {
        required: true, 
        type: Number
        // Should match a http status code.
    },
    hint: {
        required: true, 
        type: String
        // A message indicating on what the error might of been caused by.
    },
    fullError: {
        type: Object
        // Optional error object.
    },
    location: {
        type: String
        // Optional location string. No paticular format but as an example. "login.controller.js :14"
    }
})

// Store under admin prefix as will be accessed by admin users.
export default mongoose.model('admin.logs', logSchema);