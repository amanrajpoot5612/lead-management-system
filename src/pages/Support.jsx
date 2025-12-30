import React from "react";

const Support = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Support & Help Center</h1>
        <p className="text-gray-500">
          Get help, raise issues, or contact our support team
        </p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SupportCard
          title="Knowledge Base"
          desc="Step-by-step guides and FAQs"
          action="Browse Articles"
        />
        <SupportCard
          title="Raise a Ticket"
          desc="Report issues or request features"
          action="Create Ticket"
        />
        <SupportCard
          title="Contact Support"
          desc="Reach our team directly"
          action="Email Support"
        />
      </div>

      {/* Common Issues */}
      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">
          Common Issues
        </h2>
        <ul className="space-y-3 text-gray-700">
          <Issue text="Leads not syncing from Google Ads" />
          <Issue text="Meta Ads access token expired" />
          <Issue text="Website form integration not working" />
          <Issue text="Duplicate leads appearing" />
        </ul>
      </div>

      {/* Ticket Form */}
      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">
          Create Support Ticket
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Subject" placeholder="Brief issue summary" />
          <Input label="Category" placeholder="Integration / Leads / Billing" />
          <textarea
            className="md:col-span-2 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Describe the issue in detail"
          />
          <button
            type="button"
            className="md:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Ticket
          </button>
        </form>
      </div>

      {/* System Status */}
      <div className="border rounded-lg p-6 bg-green-50">
        <h2 className="text-lg font-medium mb-2">
          System Status
        </h2>
        <p className="text-green-700">
          ✅ All systems operational
        </p>
      </div>
    </div>
  );
};

/* Reusable Components */

const SupportCard = ({ title, desc, action }) => (
  <div className="border rounded-lg p-5 space-y-2">
    <h3 className="font-medium">{title}</h3>
    <p className="text-gray-500 text-sm">{desc}</p>
    <button className="text-blue-600 text-sm font-medium hover:underline">
      {action}
    </button>
  </div>
);

const Issue = ({ text }) => (
  <li className="flex items-center justify-between">
    <span>{text}</span>
    <button className="text-blue-600 text-sm hover:underline">
      View
    </button>
  </li>
);

const Input = ({ label, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">{label}</label>
    <input
      className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
    />
  </div>
);

export default Support;
