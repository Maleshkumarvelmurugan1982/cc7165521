require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Book = require('./models/Book');

const app = express();
const PORT = process.env.PORT || 5000;

// ? MIDDLEWARE
app.use(
  cors({
    origin: 'https://cc7165521-4z3h.vercel.app', // allow only your Vercel frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(express.json());

// ? Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use('/uploads', express.static(uploadsDir));

// ? MULTER CONFIG
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads/'),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ? DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('? Connected to MongoDB'))
  .catch((err) => {
    console.error('? MongoDB connection error:', err);
    process.exit(1);
  });

// ? ROUTES
app.get('/', (_req, res) => res.send('?? Book API is live!'));

// Get all books
app.get('/api/books', async (_req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Get one book
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) res.json(book);
    else res.status(404).json({ message: 'Book not found' });
  } catch {
    res.status(400).json({ message: 'Invalid book ID' });
  }
});

// Stream PDF
app.get('/api/books/:id/pdf', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const filePath = path.join(__dirname, book.pdfPath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'PDF file not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${path.basename(filePath)}"`);

    const stream = fs.createReadStream(filePath);
    stream.on('error', (err) => {
      console.error('? PDF stream error:', err);
      if (!res.headersSent) res.status(500).send('Error streaming PDF');
      else res.destroy();
    });
    stream.pipe(res);
  } catch (err) {
    res.status(400).json({ message: 'Error streaming PDF' });
  }
});

// Download PDF
app.get('/api/books/:id/download', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const filePath = path.join(__dirname, book.pdfPath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'PDF file not found' });
    }

    res.download(filePath);
  } catch (err) {
    res.status(400).json({ message: 'Error downloading PDF', error: err.message });
  }
});

// Add new book
app.post('/api/books', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'PDF file is required' });
    const newBook = new Book({ ...req.body, pdfPath: req.file.path });
    await newBook.save();
    res.status(201).json({ message: 'Book added', book: newBook });
  } catch (err) {
    res.status(400).json({ message: 'Error adding book', error: err.message });
  }
});

// Update book
app.put('/api/books/:id', upload.single('pdf'), async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.pdfPath = req.file.path;

    const updated = await Book.findByIdAndUpdate(req.params.id, update, { new: true });
    if (updated) res.json({ message: 'Book updated', book: updated });
    else res.status(404).json({ message: 'Book not found' });
  } catch (err) {
    res.status(400).json({ message: 'Error updating book', error: err.message });
  }
});

// Delete book
app.delete('/api/books/:id', async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (deleted) {
      fs.unlink(deleted.pdfPath, (err) => {
        if (err) console.error('? Error deleting file:', err);
      });
      res.json({ message: 'Book deleted' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Error deleting book', error: err.message });
  }
});

// Like
app.put('/api/books/:id/like', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
    if (book) res.json(book);
    else res.status(404).json({ message: 'Book not found' });
  } catch {
    res.status(400).json({ message: 'Error liking book' });
  }
});

// Dislike
app.put('/api/books/:id/dislike', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, { new: true });
    if (book) res.json(book);
    else res.status(404).json({ message: 'Book not found' });
  } catch {
    res.status(400).json({ message: 'Error disliking book' });
  }
});

// Fallback route
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

// ? Start server
app.listen(PORT, () => console.log(`?? Server running at http://localhost:${PORT}`));

