import React from 'react';
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Search from "./Search";
import RecipeTable from "./RecipeTable";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="recipes" element={<RecipeTable />} />
        <Route path="ingredients" element={<RecipeTable />} />
      </Route>
    </Routes>
  );
};

export default App;
