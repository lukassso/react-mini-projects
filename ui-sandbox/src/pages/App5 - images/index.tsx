import React, { useState, useEffect } from "react";

interface Character {
  id: number;
  name: string;
  species: string;
  image: string;
}

interface ApiResponse {
  info: {
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const CharacterBrowser: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://rickandmortyapi.com/api/character?page=${page}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((next) => Math.max(next + 1, totalPages));
    return console.log("page: ", page);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Rick and Morty Characters
      </h1>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevPage}
          disabled={page <= 1}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading characters...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {characters.map((char) => (
            <div
              key={char.id}
              className="bg-gray-800 text-white rounded-lg shadow-lg text-center p-2"
            >
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-auto rounded-md mb-2"
              />
              <h3 className="font-bold">{char.name}</h3>
              <p className="text-sm text-gray-400">{char.species}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterBrowser;
