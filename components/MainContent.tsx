"use client";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import ContentSwitch from "./ContentSwitch";
import { SuratsType } from "@/lib/type";
import { AppDispatch, RootState } from "@/store/store";
import { fetchJuz, fetchSurat, setCurrentType } from "@/store/content-slice";
import Surat from "./Surat";
import { Button, buttonVariants } from "./ui/button";

const MainContent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const surat = useSelector((state: RootState) => state.content.surat);
  const juz = useSelector((state: RootState) => state.content.juz);
  const contentType = useSelector(
    (state: RootState) => state.content.currentContentType
  );

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
  }, [contentType]);

  return (
    <main>
      <div className="mb-4">
        <ContentSwitch
          contentType={contentType}
          switchHandler={switchHandler}
        />
      </div>
      <div className="grid desktop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-3">
        {contentType === "surat" &&
          surat?.chapters.map((surat: SuratsType) => {
            return <Surat key={surat.id} surat={surat} />;
          })}
      </div>
      {contentType === "juz" &&
        juz?.juzs.map((juz) => {
          return (
            <div
              key={juz.id}
              className="p-3 border border-slate-200 dark:border-accent rounded-md my-2 w-full"
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
                  const suratFromJuz = surat?.chapters[parseInt(verse) - 1];
                  return <Surat key={index} surat={suratFromJuz} />;
                })}
              </div>
            </div>
          );
        })}
    </main>
  );
};

export default MainContent;
