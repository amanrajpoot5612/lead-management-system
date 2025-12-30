import React, { useMemo } from "react";
import { useDashboardLeads } from "../hooks/useDashboardLeads";

const calculatePercentageChange = (current, previous) => {
  if (previous === 0 && current === 0) return 0;
  if (previous === 0) return 100;
  return ((current - previous) / previous) * 100;
};

const Analytics = () => {
  const { google, meta, website, loading, error } = useDashboardLeads();

  const allLeads = useMemo(
    () => [...google, ...meta, ...website],
    [google, meta, website]
  );

  const analytics = useMemo(() => {
    const total = allLeads.length;

    const byStatus = allLeads.reduce((acc, lead) => {
      const status = lead.status || "unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const bySource = allLeads.reduce((acc, lead) => {
      const source = lead.source || "unknown";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

    const converted = byStatus.converted || 0;
    const qualified = byStatus.qualified || 0;
    const contacted = byStatus.contacted || 0;

    const conversionRate =
      total > 0 ? ((converted / total) * 100).toFixed(1) : "0.0";

    return {
      total,
      converted,
      qualified,
      contacted,
      conversionRate,
      bySource,
    };
  }, [allLeads]);

  const splitByYear = (leads) => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    return leads.reduce(
      (acc, lead) => {
        const year = new Date(lead?.timeline?.createdAt).getFullYear();

        if (year === currentYear) acc.current.push(lead);
        else if (year === previousYear) acc.previous.push(lead);

        return acc;
      },
      { current: [], previous: [] }
    );
  };

  const buildAnalytics = (leads) => {
    const total = leads.length;

    const byStatus = leads.reduce((acc, lead) => {
      const status = lead.status || "unknown";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const bySource = leads.reduce((acc, lead) => {
      const source = lead.source || "unknown";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      converted: byStatus.converted || 0,
      cancelled: byStatus.cancelled || 0,
      contacted: byStatus.contacted || 0,
      staging: byStatus.staging || 0,
      bySource,
    };
  };

  const { current, previous } = useMemo(
    () => splitByYear(allLeads),
    [allLeads]
  );

  const currentAnalytics = useMemo(() => buildAnalytics(current), [current]);

  const previousAnalytics = useMemo(() => buildAnalytics(previous), [previous]);

  const currentConversionRate =
    currentAnalytics.total > 0
      ? (currentAnalytics.converted / currentAnalytics.total) * 100
      : 0;

  const previousConversionRate =
    previousAnalytics.total > 0
      ? (previousAnalytics.converted / previousAnalytics.total) * 100
      : 0;

  if (loading) return <p className="p-6">Loading analytics...</p>;
  if (error) return <p className="p-6">Error loading analytics</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Analytics</h1>
        <p className="text-gray-500">
          Track performance and conversion insights
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Leads"
          current={currentAnalytics.total}
          previous={previousAnalytics.total}
        />

        <MetricCard
          title="Cancelled Leads"
          current={currentAnalytics.cancelled || 0}
          previous={previousAnalytics.cancelled || 0}
        />

        <MetricCard
          title="Converted Leads"
          current={currentAnalytics.converted}
          previous={previousAnalytics.converted}
        />
        <MetricCard
          title="Conversion Rate"
          current={currentConversionRate}
          previous={previousConversionRate}
          suffix="%"
        />
      </div>

      {/* Charts placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartPlaceholder title="Leads Over Time" />
        <ChartPlaceholder title="Conversions Over Time" />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Source Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Lead Sources
          </h2>

          <div className="space-y-4">
            {Object.entries(analytics.bySource).map(([source, count]) => {
              const percentage =
                analytics.total > 0
                  ? ((count / analytics.total) * 100).toFixed(1)
                  : 0;

              return (
                <SourceItem
                  label={source}
                  current={currentAnalytics.total}
                  previous={previousAnalytics.total}
                />
              );
            })}
          </div>
        </div>

        {/* Funnel */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Conversion Funnel
          </h2>

          <div className="space-y-4">
            <FunnelStep
              label="Total Leads"
              current={currentAnalytics.total}
              previous={previousAnalytics.total}
            />
            <FunnelStep
              label="Converted"
              current={currentAnalytics.converted}
              previous={previousAnalytics.converted}
            />
            <FunnelStep
              label="Staging"
              current={currentAnalytics.staging}
              previous={previousAnalytics.staging}
            />
            <FunnelStep
              label="Cancelled"
              current={currentAnalytics.cancelled}
              previous={previousAnalytics.cancelled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
/* ---------------- Components ---------------- */

const MetricCard = ({ title, current, previous }) => {
  const change = calculatePercentageChange(current, previous);

  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="text-3xl font-semibold text-gray-800 mt-2">{(current).toFixed(1)}</p>

      {change !== null && (
        <div className="mt-2 flex items-center gap-1 text-sm">
          <span
            className={`font-medium ${
              isPositive
                ? "text-green-600"
                : isNegative
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {isPositive && "▲"}
            {isNegative && "▼"}
            {Math.abs(change).toFixed(1)}%
          </span>
          <span className="text-gray-400">vs last year</span>
        </div>
      )}
    </div>
  );
};

const ChartPlaceholder = ({ title }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-lg font-medium text-gray-800 mb-4">{title}</h2>
    <div className="h-56 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
      Chart goes here
    </div>
  </div>
);

const SourceItem = ({ label, current, previous }) => {
  const change = calculatePercentageChange(current, previous);

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>

      <div className="text-right">
        <div className="font-medium text-gray-800">{current}</div>

        {change !== null && (
          <div
            className={`text-xs ${
              change > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change > 0 ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>
    </div>
  );
};

const FunnelStep = ({ label, current, previous }) => {
  const change = calculatePercentageChange(current, previous);

  return (
    <div className="bg-gray-50 rounded-lg px-4 py-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-gray-800">{current}</span>
      </div>

      {change !== null && (
        <div
          className={`text-xs mt-1 ${
            change > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change > 0 ? "▲" : "▼"} {Math.abs(change).toFixed(1)}% YoY
        </div>
      )}
    </div>
  );
};
