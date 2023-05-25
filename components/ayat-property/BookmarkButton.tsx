"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { setBookmark } from "@/store/content-slice";

interface Props {
  verseKey: string;
}

const BookmarkButton = ({ verseKey }: Props) => {
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
    dispatch(setBookmark(verseKey));

    if (bookmarked.find((bookmark) => bookmark === verseKey)) {
      const updatedBookmark = bookmarked.filter(
        (bookmark) => bookmark !== verseKey
      );
      setbookmarked(updatedBookmark);
    } else {
      setbookmarked((prev) => [...prev, verseKey]);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      aria-label="bookmark button"
    >
      <Bookmark
        fill={bookmarked.includes(verseKey) ? "purple" : "none"}
        className="cursor-pointer dark:text-white"
        color="purple"
      />
    </Button>
  );
};

export default BookmarkButton;
