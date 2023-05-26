import React from "react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

interface Props {
  cards: number;
}

const SkeletonAyat = ({ cards }: Props) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, index) => (
          <Card key={index} className="h-56 p-4 mb-2 dark:bg-background">
            <div className="w-[100%] flex justify-between">
              <div className="flex flex-col gap-4">
                <div className="bg-gray-300 dark:bg-gray-400 h-6 w-12 rounded-sm mb-2 animate-pulse"></div>
                <div className="bg-gray-300 dark:bg-gray-400 h-9 w-12 rounded-sm animate-pulse"></div>
                <div className="bg-gray-300 dark:bg-gray-400 h-9 w-12 rounded-sm animate-pulse"></div>
              </div>
              <div className="mt-10">
                <div className="bg-gray-300 dark:bg-gray-400 mobile:h-10 mobile:w-[15rem] h-12 w-[50rem] rounded-sm animate-pulse"></div>
              </div>
            </div>
            <div className="bg-gray-300 dark:bg-gray-400 mobile:h-5 mobile:w-[13rem] h-6 w-[35rem] rounded-sm mt-6 animate-pulse"></div>
          </Card>
        ))}
    </>
  );
};

export default SkeletonAyat;
