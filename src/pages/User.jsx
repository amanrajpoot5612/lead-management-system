import React from "react";

const users = [
  {
    id: 1,
    name: "Aman Kumar",
    email: "aman@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Rohit Sharma",
    email: "rohit@example.com",
    role: "Sales",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Neha Verma",
    email: "neha@example.com",
    role: "Manager",
    status: "Active",
  },
];

const User = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Users
          </h1>
          <p className="text-gray-500 text-sm">
            Manage platform users and permissions
          </p>
        </div>

        <button className="btn-primary">
          + Add User
        </button>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Role</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-right px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Disable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
