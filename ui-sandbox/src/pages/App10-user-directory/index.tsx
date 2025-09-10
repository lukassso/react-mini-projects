import React, { useState, useEffect, useMemo } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}

const API_URL = "https://jsonplaceholder.typicode.com/users";

const UserDirectory: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [nameFilter, setNameFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  useEffect(() => {
    setError(null);
    setLoading(true);
    const fetchApiData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        setUsers(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    let finalArray = [...users]
      .filter((user) => {
        return user.name.toLowerCase().includes(nameFilter.toLowerCase());
      })
      .filter((user) => {
        return user.company.name
          .toLowerCase()
          .includes(companyFilter.toLowerCase());
      })
      .sort((a, b) => {
        if (sortBy === "username-asc") {
          return a.username.localeCompare(b.username);
        }
        return a.name.localeCompare(b.name);
      });
    return finalArray;
  }, [users, nameFilter, companyFilter, sortBy]);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Directory</h1>

      {/* Filter Controls */}
      <div className="flex gap-4 mb-4 p-4 bg-gray-100 rounded">
        <input
          type="text"
          placeholder="Filter by name..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <input
          type="text"
          placeholder="Filter by company..."
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="username-asc">Username (A-Z)</option>
        </select>
      </div>

      {/* User List */}
      <div className="space-y-3">
        {filteredAndSortedUsers.map((user) => (
          <div key={user.id} className="p-3 bg-white shadow rounded">
            <p className="font-bold text-lg">
              {user.name} (@{user.username})
            </p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 text-sm">
              Company: {user.company.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDirectory;
