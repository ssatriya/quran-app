import { Separator } from "@radix-ui/react-separator";
import React from "react";

const SkeletonLoading = () => {
  return (
    <div className="p-3 border border-slate-200 dark:border-accent rounded-md mb-2 animate-pulse">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5 items-center mr-6 mb-4">
          <div className="w-10 h-6 bg-gray-400 rounded-sm"></div>
          <div className="flex flex-col gap-3">
            <div className="w-10 h-8 bg-gray-400 rounded-sm"></div>
            <div className="w-10 h-8 bg-gray-400 rounded-sm"></div>
          </div>
        </div>
        <div dir="rtl" className="flex flex-wrap my-8"></div>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex gap-1 flex-wrap mt-3">
        <p className="text-gray-600 dark:text-white dark:text-opacity-75"></p>
      </div>
    </div>
  );
};

export default SkeletonLoading;
