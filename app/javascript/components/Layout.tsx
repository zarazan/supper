import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = (): JSX.Element => {
  return (
    <div className="m-2">
      <div className="flex m-6">
        <h1 className="text-orange-500">ICON</h1>
        <Nav />
        <h1 className="ml-auto text-white">PROFILE</h1>
      </div>

      <div className="m-6 text-gray-400">
        <Outlet />
      </div>
    </div>
  )
}

const Nav = (): JSX.Element => {
  return (
    <nav className="ml-2">
      <ul className="flex gap-2">
        <NavLink name="Home" path="/" />
        <NavLink name="Search" path="/search" />
        <NavLink name="Recipes" path="/recipes" />
        <NavLink name="Foods" path="/foods" />
      </ul>
    </nav>
  )
}

const NavLink = ({ name, path }: {name: string, path: string}): JSX.Element => {
  return (
    <li>
      <Link to={path} className="text-green-600">{name}</Link>
    </li>
  )
}

export default Layout;
