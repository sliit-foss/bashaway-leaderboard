import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base";
import transformLeaderboardData from "./transformer";

export const leaderboardApi = createApi({
  reducerPath: "leaderboardApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchLeaderboard: builder.query({
      query: ({ round, ghostLegion }) => `/api/leaderboard?round=${round}&ghost_legion=${ghostLegion}`,
      transformResponse: transformLeaderboardData
    }),
    fetchPastLeaderboards: builder.query({
      queryFn: async ({ year = 2023, round, ghostLegion, page, filters, sorts }) => {
        let path = round == 1 ? "round1" : ghostLegion == true ? "ghost-legion" : "final";
        try {
          const data = await import(`../../../data/annual-leaderboard/${year}/${path}.json`);
          const transformedData = transformLeaderboardData(data.default, undefined, { page, filters, sorts });
          return { data: transformedData };
        } catch (error) {
          console.log("Failed to fetch data dynamically");
        }
      }
    })
  })
});

export const {
  useFetchLeaderboardQuery,
  useLazyFetchLeaderboardQuery,
  useFetchPastLeaderboardsQuery,
  useLazyFetchPastLeaderboardsQuery
} = leaderboardApi;
