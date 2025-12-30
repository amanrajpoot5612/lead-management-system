// assumption
export const REVENUE_PER_CONVERSION = 25000;

// total leads per category
export const countLeads = (leads = []) => {
  return leads.length;
};

// per category leads 2025
export const perCategoryLeads2025 = (perCategoryLead) => {
  let count = 0;
  perCategoryLead.filter((lead) => {
    const createdAt = lead?.timeline?.createdAt;
    if (!createdAt) return false;

    const date = new Date(createdAt);
    if (date.getFullYear() === 2025) {
      count++;
    }
  });
  return count;
};

// category leads converted 2025
export const convertedLeadsCategory = (leads = []) => {
  return leads.filter(
    (intermediate) => intermediate.status?.toLowerCase() === "converted"
  ).length;
};

// conversion rate
export const conversionRate = (totalCategoryLeads, convertedLeads) => {
  totalCategoryLeads === 0
    ? 0
    : ((convertedLeads / totalCategoryLeads) * 100).toFixed(2);
};

// estimated revenue google, meta, website
export const estimatedRevenue = (convertedLeads) => {
  return convertedLeads * REVENUE_PER_CONVERSION;
};

// staging leads
export const stagingLeads = (leads) => {
  return leads.filter((lead) => lead.status?.toLowerCase() === "staging")
    .length;
};

// cancelled leads
export const cancelledLeads = (leads) => {
  return leads.filter((lead) => lead.status?.toLowerCase() === "cancelled")
    .length;
};
