import { useState, useEffect } from 'react';

function BookCard({ book, onEdit, onDelete, onLike, onDislike, isEditing, onSaveEdit, onCancelEdit }) {
  const [form, setForm] = useState(book);
  const [fieldsToEdit, setFieldsToEdit] = useState(['title', 'author', 'genre', 'year']);

  useEffect(() => {
    setForm(book);
    setFieldsToEdit(['title', 'author', 'genre', 'year']);
  }, [book]);

  const toggleField = (field) => {
    if (fieldsToEdit.includes(field)) {
      setFieldsToEdit(fieldsToEdit.filter(f => f !== field));
    } else {
      setFieldsToEdit([...fieldsToEdit, field]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (fieldsToEdit.includes('title') && !form.title.trim()) {
      alert('Title is required');
      return;
    }
    if (fieldsToEdit.includes('author') && !form.author.trim()) {
      alert('Author is required');
      return;
    }

    const updatedBook = { ...book };
    fieldsToEdit.forEach(field => {
      updatedBook[field] = form[field];
    });

    onSaveEdit(updatedBook);
  };

  const handleReadOnline = () => {
    alert("Read Online file will be uploaded soon.");
  };

  const handleDownload = () => {
    alert("Download file will be uploaded soon.");
  };

  if (!isEditing) {
    // Display mode
    return (
      <div className="bg-purple-50 shadow-md rounded-xl p-5 text-purple-900">
        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        <p><span className="font-medium">Author:</span> {book.author}</p>
        <p><span className="font-medium">Genre:</span> {book.genre}</p>
        <p><span className="font-medium">Year:</span> {book.year}</p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => onEdit(book)}
            className="bg-yellow-300 text-yellow-900 font-medium px-4 py-1 rounded hover:bg-yellow-400 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="bg-rose-300 text-rose-900 font-medium px-4 py-1 rounded hover:bg-rose-400 transition"
          >
            Delete
          </button>
        </div>

        <div className="mt-4 flex items-center justify-start gap-6">
          <button
            onClick={() => onLike(book.id)}
            className="flex items-center gap-2 bg-green-400 text-white font-medium px-3 py-1 rounded-full hover:bg-green-500 transition"
          >
            👍 <span className="text-white">{book.likes || 0}</span>
          </button>
          <button
            onClick={() => onDislike(book.id)}
            className="flex items-center gap-2 bg-pink-400 text-white font-medium px-3 py-1 rounded-full hover:bg-pink-500 transition"
          >
            👎 <span className="text-white">{book.dislikes || 0}</span>
          </button>
        </div>

        {/* Read Online / Download Buttons */}
        <div className="mt-4 flex justify-start gap-4">
          <button
            onClick={handleReadOnline}
            className="bg-blue-500 text-white font-medium px-4 py-1 rounded hover:bg-blue-600 transition"
          >
            Read Online
          </button>
          <button
            onClick={handleDownload}
            className="bg-indigo-500 text-white font-medium px-4 py-1 rounded hover:bg-indigo-600 transition"
          >
            Download
          </button>
        </div>
      </div>
    );
  }

  // Edit mode UI
  const fields = [
    { label: 'Title *', name: 'title', type: 'text' },
    { label: 'Author *', name: 'author', type: 'text' },
    { label: 'Genre', name: 'genre', type: 'text' },
    { label: 'Year', name: 'year', type: 'number' },
  ];

  return (
    <div className="bg-purple-50 shadow-md rounded-xl p-5 text-purple-900">
      <h2 className="text-xl font-bold mb-2">Editing: {book.title}</h2>

      {/* Checkboxes to select which fields to edit */}
      <div className="mb-4">
        <p className="font-semibold mb-2">Select fields to edit:</p>
        {fields.map(({ name, label }) => (
          <label key={name} className="inline-flex items-center mr-4 cursor-pointer">
            <input
              type="checkbox"
              checked={fieldsToEdit.includes(name)}
              onChange={() => toggleField(name)}
              className="mr-1"
            />
            {label.replace(' *', '')}
          </label>
        ))}
      </div>

      {/* Input fields */}
      {fields.map(({ label, name, type }) => (
        <label key={name} className="block mb-4">
          <span className="block mb-1 font-semibold">{label}</span>
          <input
            type={type}
            name={name}
            value={form[name]}
            onChange={handleChange}
            disabled={!fieldsToEdit.includes(name)}
            className={`w-full px-3 py-2 border rounded ${
              !fieldsToEdit.includes(name) ? 'bg-gray-200 cursor-not-allowed' : ''
            }`}
          />
        </label>
      ))}

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={handleSave}
          className="bg-green-400 text-white px-4 py-1 rounded hover:bg-green-500 transition"
        >
          Save
        </button>
        <button
          onClick={onCancelEdit}
          className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>

      {/* Read Online / Download Buttons in Edit Mode */}
      <div className="mt-4 flex justify-start gap-4">
        <button
          onClick={handleReadOnline}
          className="bg-blue-500 text-white font-medium px-4 py-1 rounded hover:bg-blue-600 transition"
        >
          Read Online
        </button>
        <button
          onClick={handleDownload}
          className="bg-indigo-500 text-white font-medium px-4 py-1 rounded hover:bg-indigo-600 transition"
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default BookCard;
