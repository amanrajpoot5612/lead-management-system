import React from "react";

const Report = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Reports & Analytics</h1>
        <p className="text-gray-500">
          Performance insights across all integrated lead sources
        </p>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Total Leads" value="1,240" />
        <KpiCard title="Qualified Leads" value="620" />
        <KpiCard title="Converted Leads" value="320" />
        <KpiCard title="Conversion Rate" value="25.8%" />
      </div>

      {/* Lead Source Breakdown */}
      <div className="border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Leads by Source</h2>
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Source</th>
              <th className="p-3">Leads</th>
              <th className="p-3">Conversions</th>
              <th className="p-3">Conversion %</th>
            </tr>
          </thead>
          <tbody>
            <Row source="Google Ads" leads="540" conv="160" />
            <Row source="Meta Ads" leads="420" conv="110" />
            <Row source="Website" leads="280" conv="50" />
          </tbody>
        </table>
      </div>

      {/* Lead Status Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Lead Status</h2>
          <ul className="space-y-3">
            <Status label="New" value="480" color="bg-blue-500" />
            <Status label="Contacted" value="360" color="bg-yellow-500" />
            <Status label="Qualified" value="240" color="bg-green-500" />
            <Status label="Lost" value="160" color="bg-red-500" />
          </ul>
        </div>

        {/* Time-Based Insight */}
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">
            Weekly Lead Trend
          </h2>
          <div className="text-gray-500 text-center py-10">
            📈 Line / Bar chart placeholder  
            <br />
            (Leads generated over time)
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h2 className="text-lg font-medium mb-3">Key Insights</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Google Ads has the highest conversion rate.</li>
          <li>Website leads are lower but high-intent.</li>
          <li>Follow-ups can improve contacted → qualified ratio.</li>
        </ul>
      </div>
    </div>
  );
};

/* Reusable Components */

const KpiCard = ({ title, value }) => (
  <div className="border rounded-lg p-5">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

const Row = ({ source, leads, conv }) => (
  <tr className="border-t">
    <td className="p-3">{source}</td>
    <td className="p-3">{leads}</td>
    <td className="p-3">{conv}</td>
    <td className="p-3 font-medium">
      {((conv / leads) * 100).toFixed(1)}%
    </td>
  </tr>
);

const Status = ({ label, value, color }) => (
  <li className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
    <span className="font-medium">{value}</span>
  </li>
);

export default Report;
