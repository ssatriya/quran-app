import { FetchSurat, FetchJuz } from "@/lib/type";
import { ErrorFetchDataResponse } from "@/lib/type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchSurat = createAsyncThunk<
  FetchSurat,
  null,
  { rejectValue: ErrorFetchDataResponse }
>("data/fetch-surah", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      "https://api.quran.com/api/v4/chapters?language=id"
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorFetchDataResponse>;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const fetchJuz = createAsyncThunk<
  FetchJuz,
  null,
  { rejectValue: ErrorFetchDataResponse }
>("data/fetch-juz", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("https://api.quran.com/api/v4/juzs");
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorFetchDataResponse>;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

interface State {
  surat: FetchSurat | undefined;
  juz: FetchJuz | undefined;
  currentContentType: string;
  status: string;
  error: undefined | object;
  bookmarks: string[];
}

const initialState: State = {
  surat: undefined,
  juz: undefined,
  currentContentType: "surat",
  status: "idle",
  error: undefined,
  bookmarks: [],
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setCurrentType(state, action) {
      state.currentContentType = action.payload;
    },
    setBookmark(state, action) {
      const storedBookmarks = localStorage.getItem("bookmarks");

      if (storedBookmarks) {
        const parsedBookmarks = JSON.parse(storedBookmarks);
        state.bookmarks = parsedBookmarks;
        const checkBookmark = state.bookmarks.find(
          (bookmark) => bookmark === action.payload
        );

        if (checkBookmark) {
          const updatedBookmarks = state.bookmarks.filter(
            (bookmark) => bookmark !== action.payload
          );
          state.bookmarks = updatedBookmarks;
          localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
        } else {
          state.bookmarks.push(action.payload);
          localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
        }
      } else {
        state.bookmarks.push(action.payload);
        localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSurat.pending, (state) => {
        state.status = "loading";
        state.surat = undefined;
        state.error = undefined;
      })
      .addCase(fetchSurat.fulfilled, (state, action) => {
        state.surat = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSurat.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(fetchJuz.pending, (state) => {
        state.status = "loading";
        state.juz = undefined;
        state.error = undefined;
      })
      .addCase(fetchJuz.fulfilled, (state, action) => {
        state.juz = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchJuz.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const { setCurrentType, setBookmark } = contentSlice.actions;
export default contentSlice.reducer;
