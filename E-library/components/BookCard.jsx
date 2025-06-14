function BookCard({ book, onEdit, onDelete, onLike, onDislike }) {
  return (
    <div className="bg-purple-50 shadow-md rounded-xl p-5 text-purple-900">
      <h2 className="text-xl font-bold mb-2">{book.title}</h2>
      <p><span className="font-medium">Author:</span> {book.author}</p>
      <p><span className="font-medium">Genre:</span> {book.genre}</p>
      <p><span className="font-medium">Year:</span> {book.year}</p>

      {/* Edit / Delete Buttons */}
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

      {/* Like / Dislike Buttons with White Count */}
      <div className="mt-4 flex items-center justify-start gap-6">
        <button
          onClick={() => onLike(book.id)}
          className="flex items-center gap-2 bg-green-400 text-white font-medium px-3 py-1 rounded-full hover:bg-green-500 transition"
        >
          👍 <span className="text-white">{book.likes}</span>
        </button>
        <button
          onClick={() => onDislike(book.id)}
          className="flex items-center gap-2 bg-pink-400 text-white font-medium px-3 py-1 rounded-full hover:bg-pink-500 transition"
        >
          👎 <span className="text-white">{book.dislikes}</span>
        </button>
      </div>
    </div>
  );
}

export default BookCard;
