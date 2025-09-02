import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";

interface BdlVariable {
  results: {
    id: number;
    name: string;
  }[];
}

const API_URL = "/api/v1/data/by-variable/3643";

const BdlVariablesList: React.FC = () => {
  const {
    data: variables,
    loading,
    error,
    fetchData,
  } = useFetch<BdlVariable>();

  useEffect(() => {
    fetchData(API_URL);
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
        {variables &&
          variables.results.map((variable) => (
            <li key={variable.id} className="mb-2 p-2 bg-gray-100 rounded">
              <strong className="text-blue-700">{variable.name}</strong>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BdlVariablesList;
