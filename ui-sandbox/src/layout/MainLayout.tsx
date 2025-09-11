import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-md sticky top-0 z-10">
        <nav className="container mx-auto flex justify-between items-center">
          <ul className="flex gap-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/app1">App one</NavLink>
            </li>
            <li>
              <NavLink to="/app2">App two</NavLink>
            </li>
            <li>
              <NavLink to="/app3">App three</NavLink>
            </li>
            <li>
              <NavLink to="/app4">App four - ToDoList</NavLink>
            </li>
            <li>
              <NavLink to="/app5">App five - Album of images</NavLink>
            </li>
            <li>
              <NavLink to="/app6">App six - Crypto chart</NavLink>
            </li>
            <li>
              <NavLink to="/app7">App seven - Products</NavLink>
            </li>
            <li>
              <NavLink to="/app8">App eight - List of employees</NavLink>
            </li>
            <li>
              <NavLink to="/app9">App nine - Tabs</NavLink>
            </li>
            <li>
              <NavLink to="/app10">App ten - User directory</NavLink>
            </li>
            <li>
              <NavLink to="/app11">App eleven - User posts</NavLink>
            </li>
            <li>
              <NavLink to="/app12">App eleven - User posts refactor</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
      <footer className="bg-gray-800 p-4 text-center text-gray-400">
        © 2025
      </footer>
    </div>
  );
};

export default MainLayout;
