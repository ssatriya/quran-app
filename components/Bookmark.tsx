import React, { useEffect, useState } from "react";
import BookmarkPill from "./BookmarkPill";

const Bookmark = () => {
  const [bookmarkList, setBookmarkList] = useState<string[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem("bookmarks");

    if (storage) {
      const bookmarks = JSON.parse(storage);
      setBookmarkList(bookmarks);
    }
  }, []);

  return (
    <div className="h-24">
      <div className="mb-2">
        <p className="font-semibold text-base">Penanda</p>
        <div className="w-[100%] h-[2px] bg-muted"></div>
      </div>
      {bookmarkList.length !== 0 && <BookmarkPill verseKey="" />}
    </div>
  );
};

export default Bookmark;
