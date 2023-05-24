"use client";

import React, { ReactNode } from "react";

import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import store from "@/store/store";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
