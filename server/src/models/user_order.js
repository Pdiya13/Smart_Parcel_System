const mongoose = require('mongoose');

const userOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent',
      required: false,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserOrder = mongoose.model('UserOrder', userOrderSchema);

module.exports = UserOrder;