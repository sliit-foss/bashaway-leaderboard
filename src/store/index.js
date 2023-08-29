import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { leaderboardApi } from "./api";

export function makeStore() {
  return configureStore({
    devTools: import.meta.env.VITE_APP_ENV !== "production",
    reducer: combineReducers({
      [leaderboardApi.reducerPath]: leaderboardApi.reducer
    }),
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({ serializableCheck: false }).concat(leaderboardApi.middleware);
      return middleware;
    }
  });
}

export const store = makeStore();

export default { store };
