"use client";

import React, { ReactNode } from "react";

import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";

import store from "@/store/store";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
