import React, { useState } from "react";

const Integration = () => {
  const [connections, setConnections] = useState({
    googleAds: false,
    metaAds: false,
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Integrations
        </h1>
        <p className="text-gray-500">
          Connect external platforms to sync leads automatically
        </p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Google Ads */}
        <IntegrationCard
          title="Google Ads"
          description="Sync leads from Google Ads campaigns"
          connected={connections.googleAds}
          onToggle={() =>
            setConnections((prev) => ({
              ...prev,
              googleAds: !prev.googleAds,
            }))
          }
        >
          <Input label="Client ID" placeholder="Google Ads Client ID" />
          <Input
            label="Client Secret"
            placeholder="************"
            type="password"
          />
          <Input label="Customer ID" placeholder="123-456-7890" />
        </IntegrationCard>

        {/* Meta Ads */}
        <IntegrationCard
          title="Meta Ads (Facebook & Instagram)"
          description="Fetch leads from Meta Lead Forms"
          connected={connections.metaAds}
          onToggle={() =>
            setConnections((prev) => ({
              ...prev,
              metaAds: !prev.metaAds,
            }))
          }
        >
          <Input label="App ID" placeholder="Meta App ID" />
          <Input
            label="App Secret"
            placeholder="************"
            type="password"
          />
          <Input label="Page ID" placeholder="Facebook Page ID" />
        </IntegrationCard>

        {/* Website Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-800">
            Website Integration
          </h2>
          <p className="text-sm text-gray-500">
            Receive leads from your website forms
          </p>

          <Input label="Website URL" placeholder="https://example.com" />
          <Input
            label="Webhook Endpoint"
            placeholder="https://api.yoursite.com/webhook"
          />

          <button className="btn-primary">
            Save Website Integration
          </button>
        </div>

        {/* Database */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-800">
            Database Connection
          </h2>
          <p className="text-sm text-gray-500">
            Connect your database for persistent storage
          </p>

          <Input
            label="Database URI"
            placeholder="mongodb+srv://username:password@cluster"
          />
          <Input
            label="Database Name"
            placeholder="lead_management_db"
          />

          <button className="btn-primary">
            Save Database Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Integration;

/* ---------------- Components ---------------- */

const IntegrationCard = ({
  title,
  description,
  connected,
  onToggle,
  children,
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-medium text-gray-800">
          {title}
        </h2>
        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>

      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-lg text-sm font-medium ${
          connected
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {connected ? "Disconnect" : "Connect"}
      </button>
    </div>

    {connected && <div className="space-y-3">{children}</div>}
  </div>
);

const Input = ({ label, type = "text", placeholder }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
