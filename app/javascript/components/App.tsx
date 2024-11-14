import React from 'react';
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import RecipeTable from "./RecipeTable";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<RecipeTable />} />
      </Route>
    </Routes>
  );
};

function Home(): React.ReactElement {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export default App;
