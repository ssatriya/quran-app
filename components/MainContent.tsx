"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

import { FetchSurat, SuratsType } from "@/lib/type";
import { AppDispatch, RootState } from "@/store/store";
import { fetchJuz, fetchSurat, setCurrentType } from "@/store/content-slice";
import Surat from "./Surat";
import { buttonVariants } from "./ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Input } from "./ui/input";

import LoadingSpinner from "./LoadingSpinner";
import Bookmark from "./Bookmark";
import { Card } from "./ui/card";
import { Label } from "./ui/label";

const MainContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [contentLoading, setContentLoading] = useState<boolean>(false);

  const surat = useSelector((state: RootState) => state.content.surat);
  const juz = useSelector((state: RootState) => state.content.juz);
  const contentStatus = useSelector((state: RootState) => state.content.status);
  const contentType = useSelector(
    (state: RootState) => state.content.currentContentType
  );
  const [query, setQuery] = useState<string>("");

  const filtered = surat?.chapters.filter((s) => {
    const normalizeSurat = s.name_simple.toLowerCase().replace("-", "");
    return normalizeSurat.includes(query);
  });

  const switchHandler = (e: any) => {
    if (e === "surat") {
      dispatch(setCurrentType("surat"));
    }
    if (e === "juz") {
      dispatch(setCurrentType("juz"));
    }
  };

  useEffect(() => {
    if (contentType === "surat" && surat === undefined) {
      dispatch(fetchSurat(null));
      dispatch(setCurrentType("surat"));
    }
    if (contentType === "juz" && juz === undefined) {
      dispatch(fetchJuz(null));
      dispatch(setCurrentType("juz"));
    }
  }, [contentType, dispatch, juz, surat]);

  useEffect(() => {
    if (contentStatus === "loading") {
      setContentLoading(true);
    }
    if (contentStatus === "succeeded") {
      setContentLoading(false);
    }
  }, [contentStatus]);

  return (
    <div>
      <div className="mb-3">
        <Input
          type="text"
          id="search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Label className="sr-only" htmlFor="search">
          search
        </Label>
      </div>
      <Bookmark />
      <Tabs defaultValue={contentType} onValueChange={switchHandler}>
        <TabsList className="mb-4">
          <TabsTrigger value="surat">Surat</TabsTrigger>
          <TabsTrigger value="juz">Juz</TabsTrigger>
        </TabsList>
        {contentLoading ? (
          <LoadingSpinner />
        ) : (
          <TabsContent value="surat">
            <div className="grid desktop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-3">
              {contentType === "surat" &&
                surat?.chapters
                  .filter((s) => {
                    const normalizeSurat = s.name_simple
                      .toLowerCase()
                      .replace("-", "");
                    return normalizeSurat.includes(query);
                  })
                  .map((surat: SuratsType) => {
                    return <Surat key={surat.id} surat={surat} />;
                  })}
            </div>
          </TabsContent>
        )}
        {contentLoading ? (
          <LoadingSpinner />
        ) : (
          <TabsContent value="juz">
            {contentType === "juz" &&
              juz?.juzs.map((juz) => {
                return (
                  <Card
                    key={juz.id}
                    className="p-3 border mb-2 dark:bg-background dark:text-gray-300"
                  >
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/juz/${juz.id}`}
                        className={buttonVariants({ variant: "ghost" })}
                      >
                        Jus {juz.juz_number}
                      </Link>
                      <Link
                        href={`/juz/${juz.id}`}
                        className={buttonVariants({ variant: "outline" })}
                      >
                        Baca Juz
                      </Link>
                    </div>
                    <div className="mt-4">
                      {Object.keys(juz.verse_mapping).map((verse, index) => {
                        const suratFromJuz =
                          surat?.chapters[parseInt(verse) - 1];
                        return <Surat key={index} surat={suratFromJuz} />;
                      })}
                    </div>
                  </Card>
                );
              })}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default MainContent;
