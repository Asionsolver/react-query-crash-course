import { NavLink } from "react-router"


export const Header = () => {
  return (
    <div className="bg-gray-800">
      <header className="container flex justify-between items-center p-4  text-white">
        <div className="font-bold">
          <NavLink to="/">React Query Master</NavLink>
        </div>
        <nav className="">
          <ul className="flex space-x-8 ">
            <li className="hover:text-green-500 hover:underline  transition duration-300">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="hover:text-green-500 hover:underline  transition duration-300">
              <NavLink to="/trad">Fetch Old</NavLink>
            </li>
            <li className="hover:text-green-500 hover:underline  transition duration-300">
              <NavLink to="/rq">Fetch RQ</NavLink>
            </li>
            <li className="hover:text-green-500 hover:underline  transition duration-300">
              <NavLink to="/users">Users</NavLink>
            </li>
            <li className="hover:text-green-500 hover:underline  transition duration-300 visited:text-amber-300">
              <NavLink to="/products">Products</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
