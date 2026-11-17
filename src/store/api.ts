import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// The one RTK Query API for the whole app.
// Each feature adds its own endpoints later (records, saved views, ...).
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  // Tags are how we refresh cached data after a change (cache invalidation)
  tagTypes: ["Datasets", "Records", "SavedViews", "SearchHistory", "Analytics", "Preferences"],
  // Background refresh: refetch when the tab gets focus or internet comes back
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});