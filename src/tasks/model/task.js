const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  isChecked: {
    type: Boolean,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Task', taskSchema);
