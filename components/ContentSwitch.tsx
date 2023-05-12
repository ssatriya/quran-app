"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const ContentSwitch = ({ contentType, switchHandler }: any) => {
  return (
    <Tabs defaultValue={contentType} onValueChange={switchHandler}>
      <TabsList>
        <TabsTrigger value="surat" aria-labelledby="surat">
          Surat
        </TabsTrigger>
        <TabsTrigger value="juz" aria-labelledby="juz">
          Juz
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ContentSwitch;
