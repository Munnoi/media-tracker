import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? "bg-slate-700 text-white"
        : "text-slate-200 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <nav className="bg-slate-950 border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/media" className="font-bold text-xl text-indigo-400">
          Media Vault
        </Link>
        <div className="flex gap-2">
          <Link to="/media" className={linkClass("/media")}>
            All Items
          </Link>
          <Link to="/add" className={linkClass("/add")}>
            Add New
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
