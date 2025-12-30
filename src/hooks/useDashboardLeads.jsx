import { useEffect, useState } from "react";

export const useDashboardLeads = () => {
  const [google, setGoogle] = useState([]);
  const [meta, setMeta] = useState([]);
  const [website, setWebsite] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const [googleRes, metaRes, websiteRes] = await Promise.all([
          fetch(`${API_BASE}/google`),
          fetch(`${API_BASE}/meta`),
          fetch(`${API_BASE}/website`),
        ]);

        const [googleData, metaData, websiteData] = await Promise.all([
          googleRes.json(),
          metaRes.json(),
          websiteRes.json(),
        ]);

        setGoogle(googleData);
        setMeta(metaData);
        setWebsite(websiteData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return {
    google,
    meta,
    website,
    loading,
    error,
  };
};
