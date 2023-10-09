import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const hotshotsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    carbohydrates: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: false
    },
    imagePath: {
        type: String,
        required: false
    },
    barcode: {
        type: String,
        required: false
    },
    status: {
        type: String,
        validate: {
            validator: (v) => {
                return v === "pending" || v === "active" || v === "archived";
            },
            message: props => `${props.value} is not a valid status.`
        },
        required: true
    },
    createdAt: {type: Date, default: Date.now}
});

export default mongoose.model('hotshot', hotshotsSchema);