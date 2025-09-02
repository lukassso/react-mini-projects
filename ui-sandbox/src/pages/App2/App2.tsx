import React, { useState } from "react";

interface Book {
  key: string;
  title: string;
  author_name: string[];
}

const BookSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the form from reloading the page
    setLoading(true);
    setError(null);
    setResults([]);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${query}`
        );
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data = await response.json();
        setResults(data.docs);
        console.log("setResult:", results);
      } catch (err) {
        if (err instanceof Error) {
          setError(`${err.message}`);
        } else {
          setError("something wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Book Search</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Conditional Rendering */}
      {error && <div className="text-red-600 text-center">Error: {error}</div>}

      <ul className="space-y-4">
        {results.map((book) => (
          <li key={book.key} className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author_name?.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
