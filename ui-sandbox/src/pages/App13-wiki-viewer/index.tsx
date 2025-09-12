import React, { useState } from "react";

// --- Type Definitions ---
interface WikiArticle {
  article: string;
  views: number;
  rank: number;
}

const WikipediaViewer: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() - 864e5).toISOString().split("T")[0]
  );
  const [articles, setArticles] = useState<WikiArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchArticles = async () => {
    const API_URL =
      "https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/";
    setLoading(true);
    setError(null);

    try {
      const [year, month, day] = selectedDate.split("-");
      const response = await fetch(`${API_URL}${year}/${month}/${day}`);

      if (!response.ok) throw new Error(`error: ${response.status}`);

      const data = await response.json();

      if (data.items && data.items[0] && data.items[0].articles) {
        const top10articles = data.items[0].articles.slice(0, 10);
        setArticles(top10articles);
      } else {
        setArticles([]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Wikipedia Top Articles Viewer</h1>

      <div className="flex gap-2 mb-4 items-center">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleFetchArticles}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Fetching..." : "Fetch Articles"}
        </button>
      </div>

      {error && <div className="text-red-500">Error: {error}</div>}

      <ul className="space-y-2">
        {articles.map((article) => (
          <li
            key={article.rank}
            className="p-3 bg-white shadow rounded flex justify-between items-center"
          >
            <span>
              <strong className="text-lg">{article.rank}.</strong>{" "}
              {article.article.replace(/_/g, " ")}
            </span>
            <span className="text-gray-600 font-mono">
              {article.views.toLocaleString("pl-PL")} views
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WikipediaViewer;
