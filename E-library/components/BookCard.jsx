function BookCard({ book }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-purple-800 mb-1">{book.title}</h2>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Published:</strong> {book.year}
        </p>
        <button className="mt-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
          Read More
        </button>
      </div>
    </div>
  );
}

export default BookCard;

