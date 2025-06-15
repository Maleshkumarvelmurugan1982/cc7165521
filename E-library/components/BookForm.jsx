import { useState } from 'react';

function BookForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    coverImage: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      return alert('Title and Author are required');
    }
    onAdd({ ...form, id: Date.now() });
    setForm({
      title: '',
      author: '',
      genre: '',
      year: '',
      coverImage: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
        Add New Book
      </h2>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium mb-1 block">Title *</span>
        <input
          type="text"
          name="title"
          placeholder="Book title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium mb-1 block">Author *</span>
        <input
          type="text"
          name="author"
          placeholder="Author name"
          value={form.author}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium mb-1 block">Genre</span>
        <input
          type="text"
          name="genre"
          placeholder="Genre (e.g. Fiction, Self-help)"
          value={form.genre}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 font-medium mb-1 block">Published Year</span>
        <input
          type="number"
          name="year"
          placeholder="Year of publication"
          value={form.year}
          onChange={handleChange}
          min="1500"
          max={new Date().getFullYear()}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </label>

      <label className="block mb-6">
        <span className="text-gray-700 font-medium mb-1 block">Cover Image URL</span>
        <input
          type="url"
          name="coverImage"
          placeholder="Link to cover image"
          value={form.coverImage}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
      >
        Add Book
      </button>
    </form>
  );
}

export default BookForm;

