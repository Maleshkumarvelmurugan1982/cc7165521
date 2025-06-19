const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title:     { type: String, required: true },
    author:    { type: String, required: true },
    genre:     { type: String },
    year:      { type: Number },
    pdfPath:   { type: String, required: true }, // Stores the file path
    likes:     { type: Number, default: 0 },
    dislikes:  { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
