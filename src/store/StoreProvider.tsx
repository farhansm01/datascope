"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { store } from "./store";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // Turns on refetchOnFocus / refetchOnReconnect
  useEffect(() => {
    const unsubscribe = setupListeners(store.dispatch);
    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}