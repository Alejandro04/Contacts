const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('contact', ContactSchema);