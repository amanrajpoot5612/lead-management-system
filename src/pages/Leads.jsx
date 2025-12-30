import React, { useEffect, useState } from "react";
import { useDashboardLeads } from "../hooks/useDashboardLeads";

const Leads = () => {
  const { google, meta, website, loading, error } = useDashboardLeads();

  const allLeads = [...google, ...meta, ...website];

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    source: "",
  });

  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    let filtered = [...allLeads];

    // filter by status
    if (filters.status) {
      filtered = filtered.filter(
        (lead) =>
          lead.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // filter by source
    if (filters.source) {
      filtered = filtered.filter(
        (lead) =>
          lead.source?.toLowerCase() === filters.source.toLowerCase()
      );
    }

    // search by name or email
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.leadInfo?.fullName?.toLowerCase().includes(search) ||
          lead.leadInfo?.email?.toLowerCase().includes(search)
      );
    }

    setFilteredLeads(filtered);
  }, [allLeads, filters]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading leads</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Leads</h1>
          <p className="text-gray-500">Manage and track all incoming leads</p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
        <input
          placeholder="Search by name or email"
          value={filters.search}
          className="border rounded-lg px-3 py-2 w-full md:w-1/3"
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
        />

        <select
          value={filters.status}
          className="border rounded-lg px-3 py-2 w-full md:w-1/5"
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
        >
          <option value="">All Status</option>
          <option value="converted">Converted</option>
          <option value="cancelled">Cancelled</option>
          <option value="staging">Staging</option>
        </select>

        <select
          value={filters.source}
          className="border rounded-lg px-3 py-2 w-full md:w-1/5"
          onChange={(e) =>
            setFilters((f) => ({ ...f, source: e.target.value }))
          }
        >
          <option value="">All Sources</option>
          <option value="Google Ads">Google Ads</option>
          <option value="Meta Ads">Meta Ads</option>
          <option value="Website">Website</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Source</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No leads found
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">
                    {lead.leadInfo.fullName}
                  </td>
                  <td className="px-6 py-4">{lead.leadInfo.email}</td>
                  <td className="px-6 py-4">{lead.source}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4">
                    {formatDate(lead?.timeline?.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;

/* ---------------- Status Badge ---------------- */

const StatusBadge = ({ status }) => {
  const base = "px-3 py-1 rounded-full text-xs font-medium";

  const styles = {
    converted: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    staging: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`${base} ${styles[status] || ""}`}>
      {status}
    </span>
  );
};
