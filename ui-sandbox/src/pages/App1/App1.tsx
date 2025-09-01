import React, { useState, useEffect } from "react";

interface BdlVariable {
  id: number;
  name: string;
  subjectId: string;
  level: number;
}

const API_URL = "/api/v1/version";

const BdlVariablesList: React.FC = () => {
  const [variables, setVariables] = useState<BdlVariable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        const actualVariables: BdlVariable[] = data.results;
        setVariables(actualVariables);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVariables();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading data from BDL...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Variables from BDL API (GUS)</h1>
      <ul className="list-disc list-inside">
        {variables.map((variable) => (
          <li key={variable.id} className="mb-2 p-2 bg-gray-100 rounded">
            <strong className="text-blue-700">{variable.name}</strong>
            <span className="text-sm text-gray-600 ml-2">
              (Subject ID: {variable.subjectId})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BdlVariablesList;
