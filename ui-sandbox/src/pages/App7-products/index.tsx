import React, { useState, useMemo } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "Laptop Pro", price: 4500, category: "Electronics" },
  { id: 2, name: "Organic Coffee", price: 50, category: "Food" },
  { id: 3, name: "Mechanical Keyboard", price: 320, category: "Electronics" },
  { id: 4, name: "Running Shoes", price: 450, category: "Apparel" },
  { id: 5, name: "Gourmet Cheese", price: 75, category: "Food" },
];

const ProductDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  const filteredAndSortedProducts = useMemo(() => {
    let processedProducts = [...products];

    if (searchTerm) {
      processedProducts = processedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const sortedProducts = [...processedProducts].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return sortedProducts;
  }, [searchTerm, sortBy]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>

      {/* Controls */}
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      {/* Product List */}
      <ul className="space-y-2">
        {filteredAndSortedProducts.map((product) => (
          <li
            key={product.id}
            className="flex justify-between p-2 bg-white shadow rounded"
          >
            <span>
              {product.name}{" "}
              <em className="text-sm text-gray-500">({product.category})</em>
            </span>
            <span className="font-semibold">
              {product.price.toFixed(2)} PLN
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDashboard;
