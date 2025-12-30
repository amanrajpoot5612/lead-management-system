import React, { useEffect, useState } from "react";
import { useDashboardLeads } from "../hooks/useDashboardLeads";
import {
  cancelledLeads,
  conversionRate,
  convertedLeadsCategory,
  countLeads,
  estimatedRevenue,
  perCategoryLeads2025,
  stagingLeads,
} from "../utils/Dashboard.js";

const Dashboard = () => {
  const { google, meta, website, loading, error } = useDashboardLeads();

  const totalGoogleLeads = countLeads(google);
  const totalMetaLeads = countLeads(meta);
  const totalWebsiteLeads = countLeads(website);

  const netTotalLeads = totalGoogleLeads + totalMetaLeads + totalWebsiteLeads;

  const googleLeads2025 = perCategoryLeads2025(google);
  const metaLeads2025 = perCategoryLeads2025(meta);
  const websiteLeads2025 = perCategoryLeads2025(website);

  const TotalLeads2025 = googleLeads2025 + metaLeads2025 + websiteLeads2025;

  const convertedLeadsGoogle = convertedLeadsCategory(google);
  const convertedLeadsMeta = convertedLeadsCategory(meta);
  const convertedLeadsWebsite = convertedLeadsCategory(website);

  const convertedLeadsTotal =
    convertedLeadsGoogle + convertedLeadsMeta + convertedLeadsWebsite;

  const conversionRateGoogle = conversionRate(
    totalGoogleLeads,
    convertedLeadsGoogle
  );

  const conversionRateMeta = conversionRate(totalMetaLeads, convertedLeadsMeta);

  const conversionRateWebsite = conversionRate(
    totalWebsiteLeads,
    convertedLeadsWebsite
  );

  const conversionRateNet = conversionRate(netTotalLeads, convertedLeadsTotal);

  const estimatedRevenueGoogle = estimatedRevenue(convertedLeadsGoogle);
  const estimatedRevenueMeta = estimatedRevenue(convertedLeadsMeta);
  const estimatedRevenueWebsite = estimatedRevenue(convertedLeadsWebsite);

  const estimatedRevenueTotal =
    estimatedRevenueGoogle + estimatedRevenueMeta + estimatedRevenueWebsite;

  const stagingLeadsGoogle = stagingLeads(google);
  const cancelledLeadsGoogle = cancelledLeads(google);

  const stagingLeadsMeta = stagingLeads(meta);
  const cancelledLeadsMeta = cancelledLeads(meta);

  const stagingLeadsWebsite = stagingLeads(website);
  const cancelledLeadsWebsite = cancelledLeads(website);

  const stagingLeadsTotal =
    stagingLeadsGoogle + stagingLeadsMeta + stagingLeadsWebsite;

  const cancelledLeadsTotal =
    cancelledLeadsGoogle + cancelledLeadsMeta + cancelledLeadsWebsite;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Overview of your lead performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard
          title="Total Leads"
          value={netTotalLeads}
          meta="Lifetime leads"
        />
        <KpiCard
          title="New Leads"
          value={TotalLeads2025}
          meta="This year"
        />
        <KpiCard
          title="Conversion Rate"
          value={`${(convertedLeadsTotal/netTotalLeads*100).toFixed(2)}%`}
          meta="Net vfbnhm conversion rate"
        />
        <KpiCard
          title="Est. Revenue"
          value={`₹${estimatedRevenueTotal.toLocaleString("en-IN")}`}
          meta="Potential value"
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Lead Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Lead Status
          </h2>

          <div className="space-y-3">
            <StatusItem
              label="Converted"
              value={convertedLeadsTotal}
              color="bg-green-500"
            />
            <StatusItem
              label="Staging"
              value={stagingLeadsTotal}
              color="bg-blue-500"
            />
            {/* <StatusItem label="Qualified" value={30} color="bg-yellow-500" /> */}
            <StatusItem
              label="Lost"
              value={cancelledLeadsTotal}
              color="bg-red-500"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>Rahul Sharma submitted website form</li>
            <li>Meta Ads lead synced</li>
            <li>Google Ads lead converted</li>
            <li>Lead marked as lost</li>
          </ul>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Leads Over Time
        </h2>

        <div className="h-56 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
          Chart goes here
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* ---------------- Components ---------------- */

const KpiCard = ({ title, value, meta }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-3xl font-semibold text-gray-800 mt-2">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{meta}</p>
  </div>
);

const StatusItem = ({ label, value, color }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      <span className="text-gray-600">{label}</span>
    </div>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);
