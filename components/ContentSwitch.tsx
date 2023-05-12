"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const ContentSwitch = ({ contentType, switchHandler }: any) => {
  return (
    <Tabs defaultValue={contentType} onValueChange={switchHandler}>
      <TabsList>
        <TabsTrigger value="surat" aria-label="surat">
          Surat
        </TabsTrigger>
        <TabsTrigger value="juz" aria-label="juz">
          Juz
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ContentSwitch;
