const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userIdSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userIdSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserId', userIdSchema);
