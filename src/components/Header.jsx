const Header = () => {
  return (
    <header className="h-16 px-6 flex items-center justify-between border-b bg-white">
      {/* Left */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800">
          Dashboard
        </h2>
        <span className="text-xs text-gray-500">
          Lead Management System
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search (visual only) */}
        <div className="hidden md:flex items-center border rounded-lg px-3 py-1.5 text-sm text-gray-500">
          🔍 Search
        </div>

        {/* Notifications (visual only) */}
        <div className="relative cursor-pointer">
          🔔
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full" />
        </div>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
            A
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            Aman
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
