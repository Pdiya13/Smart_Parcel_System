const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  }
});

const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;
