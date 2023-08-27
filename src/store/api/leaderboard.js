import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base";

export const leaderboardApi = createApi({
  reducerPath: "leaderboardApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchLeaderboard: builder.query({
      query: () => `/api/leaderboard`
    })
  })
});

export const { useFetchLeaderboardQuery, useLazyFetchLeaderboardQuery } = leaderboardApi;
