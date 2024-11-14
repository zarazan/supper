import React from 'react';
import { Outlet, Link } from "react-router-dom";

function Layout(): React.ReactElement {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  )
}

export default Layout;
