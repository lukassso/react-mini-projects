import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useDebounce } from "../../hooks/useDebounce";

interface Book {
  key: string;
  title: string;
  author_name: string[];
}

const BookSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 500);
  const {
    data: results,
    loading,
    error,
    fetchData,
  } = useFetch<{ docs: Book[] }>();

 

  useEffect(() => {
     const url = `https://openlibrary.org/search.json?q=${debouncedQuery}`;
    if (!debouncedQuery) return;
    fetchData(url);
  },[debouncedQuery]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Book Search</h1>
     
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        
          {loading && <span className="p-2">Searching...</span>}
       

      {/* Conditional Rendering */}
      {error && <div className="text-red-600 text-center">Error: {error}</div>}

      <ul className="space-y-4">
        {results &&
          results.docs.map((book) => (
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
