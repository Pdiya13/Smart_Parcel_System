const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        trim: true
    },
    to: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
        required: true,
        trim: true
    },
    date:
    {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['PENDING', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING'
    },
    userId: {
        type: ObjectId,
        ref: "User",
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
