import React, { useState, useMemo } from "react";

interface Employee {
  id: number;
  name: string;
  department: "Engineering" | "HR" | "Marketing";
  salary: number;
}

// --- Data Source ---
const employees: Employee[] = [
  { id: 1, name: "Alice", department: "Engineering", salary: 90000 },
  { id: 2, name: "Bob", department: "Marketing", salary: 65000 },
  { id: 3, name: "Charlie", department: "Engineering", salary: 110000 },
  { id: 5, name: "Edward", department: "Marketing", salary: 80000 },
  { id: 4, name: "Diana", department: "HR", salary: 75000 },
];

const EmployeeDirectory: React.FC = () => {
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");

  const filteredAndSortedEmployees = useMemo(() => {
    return employees
      .filter((employee) => {
        if (departmentFilter === "All") {
          return true;
        }
        return employee.department === departmentFilter;
      })

      .sort((a, b) => {
        switch (sortBy) {
          case "name-asc": {
            return a.name.localeCompare(b.name);
          }
          case "salary-desc":
            return b.salary - a.salary;
          default:
            return 0;
        }
      });

  }, [departmentFilter, sortBy, employees]); 

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Employee Directory</h1>

      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded">
        <div>
          <label htmlFor="department" className="mr-2">
            Filter by Department:
          </label>
          <select
            id="department"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="salary-desc">Salary (High to Low)</option>
          </select>
        </div>
      </div>

      <ul className="space-y-2">
        {filteredAndSortedEmployees.map((employee) => (
          <li
            key={employee.id}
            className="flex justify-between p-2 bg-white shadow rounded"
          >
            <span>
              {employee.name}{" "}
              <em className="text-sm text-gray-500">({employee.department})</em>
            </span>
            <span className="font-semibold">
              {employee.salary.toLocaleString("pl-PL")} PLN
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDirectory;
