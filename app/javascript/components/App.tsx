import React from 'react';
import RecipeTable from "./RecipeTable";

const App: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl text-yellow-700">Hello from React in Rails!</h1>
      <RecipeTable />
    </div>
  );
};

export default App;
