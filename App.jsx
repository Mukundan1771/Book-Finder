import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setBooks([]);
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?title=${query}`
      );
      console.log(res)
      const data = res.data;
      
      if (data.docs.length === 0) {
        setError("No books found. Try another search.");
      } else {
        setBooks(data.docs.slice(0, 32));
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      
      <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-400">
        📚 Book Finder
      </h1>

      
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-2/3 md:w-1/2 p-3 rounded-l-xl border border-gray-600 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && fetchBooks()}
        />
        <button
          onClick={fetchBooks}
          className="bg-blue-600 text-white px-5 py-3 rounded-r-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Search
        </button>
      </div>

      
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      
      {error && (
        <p className="text-center text-red-400 font-semibold">{error}</p>
      )}

      
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book, idx) => (
          <div
            key={idx}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex flex-col items-center shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
          >
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://via.placeholder.com/150x200?text=No+Cover"
              }
              alt={book.title}
              className="h-56 w-40 object-cover rounded-xl mb-3 shadow-md"
            />
            <h2 className="text-lg font-bold text-center text-blue-300">
              {book.title}
            </h2>
            <p className="text-sm text-gray-400 mt-1 italic">
              {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
            </p>
            <p className="text-sm text-gray-500">
              {book.first_publish_year || "N/A"}
            </p>
            
            <a
              href={`https://www.amazon.in/s?k=${encodeURIComponent(
                book.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 px-4 py-2 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-700 transition-transform transform hover:scale-105"
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
