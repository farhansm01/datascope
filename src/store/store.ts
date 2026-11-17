import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

// The Redux store. Slices (search config, saved views, UI) are added in later tasks.
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;