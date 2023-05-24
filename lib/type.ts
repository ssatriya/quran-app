export interface SuratsType {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: [];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface FetchSurat {
  juzs?: [];
  chapters: {
    id: number;
    revelation_place: string;
    revelation_order: number;
    bismillah_pre: boolean;
    name_simple: string;
    name_complex: string;
    name_arabic: string;
    verses_count: number;
    pages: [];
    translated_name: {
      language_name: string;
      name: string;
    };
  }[];
}

export interface FetchJuz {
  chapters?: [];
  juzs: {
    id: number;
    juz_number: number;
    verse_mapping: {
      [id: number]: string;
    };
    first_verse_id: number;
    last_verse_id: number;
    verses_count: number;
  }[];
}

export interface ErrorFetchDataResponse {
  errorObject: object;
}

export interface AyatType {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number?: null;
  page_number: number;
  juz_number: number;
  audio: {
    url: string;
    segments: number[];
  };
  words: [
    {
      id: number;
      position: number;
      audio_url: string;
      char_type_name: string;
      code_v1: string;
      text_uthmani: string;
      page_number: number;
      line_number: number;
      text: string;
      translation: {
        text: string;
        language_name: string;
      };
      transliteration: {
        text: string;
        language_name: string;
      };
    }
  ];
}

export interface SuratAudio {
  audio_file: {
    id: number;
    chapter_id: number;
    file_size: number;
    format: string;
    audio_url: string;
    timestamps: [];
  };
}

export interface SuratInfo {
  chapter: {
    id: number;
    revelation_place: string;
    revelation_order: number;
    bismillah_pre: boolean;
    name_simple: string;
    name_complex: string;
    name_arabic: string;
    verses_count: number;
    pages: number[];
    translated_name: {
      language_name: string;
      name: string;
    };
  };
}

export interface AllJuz {
  id: number;
  juz_number: number;
  verse_mapping: {
    [id: number]: string;
  };
  first_verse_id: number;
  last_verse_id: number;
  verses_count: number;
}

export interface TerjemahanSurat {
  translationId: string;
  translationEn: string;
  asma: string;
  numberOfAyahs: number;
  name: string;
  number: number;
  typeId: string;
  typeEn: string;
  orderNumber: number;
  ayahs: [
    {
      verseId: number;
      ayahText: string;
      indoText: string;
      enText: string;
      readText: string;
      audio: string;
      juz: number;
      manzil: number;
      page: number;
      ruku: number;
      hizbQuarter: number;
      sajda: boolean;
    }
  ];
}
