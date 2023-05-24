import axios from "axios";
import { AyatType } from "./type";

interface SuratType {
  verses: AyatType[];
}

export const fetchSuratById = async (id: string) => {
  const response = await axios.get(
    `https://api.quran.com/api/v4/verses/by_chapter/${id}?language=id&words=true&word_fields=text_uthmani&audio=1&page=1&per_page=300`
  );
  return response.data as SuratType;
};
