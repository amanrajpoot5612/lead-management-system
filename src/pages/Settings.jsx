import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Settings
        </h1>
        <p className="text-gray-500">
          Manage your account and application preferences
        </p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Profile Settings */}
        <Section title="Profile">
          <Input label="Full Name" placeholder="Aman Kumar" />
          <Input label="Email Address" placeholder="aman@gmail.com" />
          <button className="btn-primary">Save Profile</button>
        </Section>

        {/* Preferences */}
        <Section title="Preferences">
          <Toggle label="Enable Dark Mode" />
          <Toggle label="Auto-assign new leads" />
          <Toggle label="Show analytics on dashboard" />
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <Toggle label="Email notifications" />
          <Toggle label="Lead status updates" />
          <Toggle label="Weekly performance report" />
        </Section>

        {/* Security */}
        <Section title="Security">
          <button className="btn-secondary">
            Change Password
          </button>
          <button className="btn-danger">
            Log out from all devices
          </button>
        </Section>
      </div>
    </div>
  );
};

export default Settings;

/* ---------------- Components ---------------- */

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
    <h2 className="text-lg font-medium text-gray-800">
      {title}
    </h2>
    {children}
  </div>
);

const Input = ({ label, placeholder }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Toggle = ({ label }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700">{label}</span>
    <input
      type="checkbox"
      className="h-5 w-5 accent-blue-600 cursor-pointer"
    />
  </div>
);

/* ---------------- Buttons ---------------- */

const baseBtn =
  "px-4 py-2 rounded-lg text-sm font-medium";

const btnPrimary =
  `${baseBtn} bg-blue-600 text-white hover:bg-blue-700`;

const btnSecondary =
  `${baseBtn} bg-gray-100 text-gray-800 hover:bg-gray-200`;

const btnDanger =
  `${baseBtn} bg-red-600 text-white hover:bg-red-700`;

