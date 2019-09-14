const mongoose = require('mongoose');

const PostsSchema = mongoose.Schema({
  title: {type: String, required: [true, "Please provide valid Title"]},
  body: {type: String, required: [true, "Please enter article Body"]},
  date: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Post', PostsSchema);