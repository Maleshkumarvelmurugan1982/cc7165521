import { useState, useEffect } from 'react';

/**
 * BookForm – add a new book or edit an existing one (with PDF upload).
 *
 * Props
 *  - initialData: optional existing book object (with _id) to edit
 *  - onSuccess:   callback to call after successful save
 */
function BookForm({ initialData = null, onSuccess }) {
  const [form, setForm] = useState({
    title:  '',
    author: '',
    genre:  '',
    year:   '',
  });
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        title:  initialData.title,
        author: initialData.author,
        genre:  initialData.genre,
        year:   initialData.year,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0] ?? null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author) return alert('Title and Author are required');
    if (!initialData && !pdf)        return alert('PDF file is required');

    const method = initialData ? 'PUT' : 'POST';
    const url = initialData
      ? `http://localhost:5000/api/books/${initialData._id}`
      : 'http://localhost:5000/api/books';

    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => body.append(k, v));
    if (pdf) body.append('pdf', pdf);

    try {
      const res = await fetch(url, { method, body });
      if (res.ok || res.status === 201) {
        if (onSuccess) onSuccess();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Failed to save book.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Failed to submit form.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-xl max-w-xl mx-auto p-10"
      encType="multipart/form-data"
    >
      <h2 className="text-3xl font-extrabold text-purple-700 mb-8 text-center">
        {initialData ? 'Edit Book' : 'Add New Book'}
      </h2>

      {/* text fields */}
      {[
        { label: 'Title *',   name: 'title',  type: 'text',   placeholder: 'Book title',  required: true },
        { label: 'Author *',  name: 'author', type: 'text',   placeholder: 'Author name', required: true },
        { label: 'Genre',     name: 'genre',  type: 'text',   placeholder: 'Genre (e.g. Fiction)' },
        { label: 'Published Year', name: 'year', type: 'number', placeholder: 'Year', min: 1500, max: new Date().getFullYear() },
      ].map(({ label, name, type, placeholder, required, min, max }) => (
        <label key={name} className="block mb-6">
          <span className="block mb-2 text-gray-700 font-semibold">{label}</span>
          <input
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300 text-gray-900"
            type={type}
            name={name}
            placeholder={placeholder}
            value={form[name] ?? ''}
            onChange={handleChange}
            required={required}
            min={min}
            max={max}
          />
        </label>
      ))}

      {/* PDF upload */}
      <label className="block mb-6">
        <span className="block mb-2 text-gray-700 font-semibold">
          {initialData ? 'Replace PDF (optional)' : 'PDF File *'}
        </span>
        <input
          type="file"
          accept="application/pdf"
          onChange={handlePdfChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none"
        />
      </label>

      <button
        type="submit"
        className="w-full py-4 mt-4 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-bold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300"
      >
        {initialData ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
}

export default BookForm;
