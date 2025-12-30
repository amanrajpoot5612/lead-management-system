import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Leads", path: "/leads" },
  { name: "Analytics", path: "/analytics" },
  { name: "Settings", path: "/settings" },
  { name: "Users", path: "/user" },
  { name: "Integrations", path: "/integration" },
  { name: "Reports", path: "/report" },
  { name: "Support", path: "/support" },
];

const Sidebar = () => {
  const linkBase =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition";

  const activeLink = "bg-blue-600 text-white";
  const inactiveLink =
    "text-gray-300 hover:bg-slate-700 hover:text-white";

  return (
    <aside className="w-60 bg-slate-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 text-xl font-semibold border-b border-slate-700">
        Lead Management System
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `${linkBase} ${
                isActive ? activeLink : inactiveLink
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Built By */}
      <div className="px-4 py-4 border-t border-slate-700 text-xs text-gray-400 space-y-2">
        <p className="uppercase tracking-wide text-gray-500">
          Built by
        </p>

        <p className="text-sm font-medium text-white cursor-pointer">
          Aman Rajpoot
        </p>

        <div className="flex flex-col gap-1">
          <a
            href="mailto:amanrajpoot5612@gmail.com"
            className="hover:text-white transition cursor-pointer"
          >
            amanrajpoot5612@gmail.com
          </a>

          <a
            href="https://linkedin.com/in/amanrajpoot5612"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition cursor-pointer"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/amanrajpoot5612"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition cursor-pointer"
          >
            GitHub
          </a>
        </div>

        <p className="text-[10px] text-gray-500">
          v1.0.0 • Lead Management System
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
