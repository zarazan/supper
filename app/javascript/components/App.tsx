import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from '../store/store'

import Layout from "./Layout";
import Home from "./Home";
import Search from "./Search";
import Recipes from "./recipes/Index";
import Foods from "./foods/Index";
import NewRecipeForm from './recipes/New';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/new" element={<NewRecipeForm />} />
          <Route path="foods" element={<Foods />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
