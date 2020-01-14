const { Schema, model } = require('mongoose');

const toolSchema = new Schema({
  description: String,
  link: String,
  tags: [String],
  title: String
});

const Tools = model('Tools', toolSchema);

module.exports = { Tools };
