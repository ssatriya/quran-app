"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { setBookmark } from "@/store/content-slice";

interface Props {
  ayatVerseKey: string;
}

const BookmarkButton = ({ ayatVerseKey }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [bookmarked, setbookmarked] = useState<string[]>([]);

  useEffect(() => {
    const storedBookmark = localStorage.getItem("bookmarks");
    if (storedBookmark) {
      const parsedBookmark = JSON.parse(storedBookmark);
      setbookmarked(parsedBookmark);
    }
  }, []);

  const handleClick = () => {
    dispatch(setBookmark(ayatVerseKey));

    if (bookmarked.find((bookmark) => bookmark === ayatVerseKey)) {
      const updatedBookmark = bookmarked.filter(
        (bookmark) => bookmark !== ayatVerseKey
      );
      setbookmarked(updatedBookmark);
    } else {
      setbookmarked((prev) => [...prev, ayatVerseKey]);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleClick}>
      <Bookmark
        fill={bookmarked.includes(ayatVerseKey) ? "purple" : "none"}
        className="cursor-pointer dark:text-white"
        color="purple"
      />
    </Button>
  );
};

export default BookmarkButton;
