const API_KEY = "6c61618f0f7e88b0c9c7babe5058cf8f";
const BASE_PATH = "https://api.themoviedb.org/3";

 export interface IResults {
  backdrop_path: string;
  poster_path: string;
  id: number;
  title: string;
  overview: string;
  name: string;
};

export interface IGetDB {
  results: IResults[];
};

interface IGenres {
  id: number;
  name: string;
};

interface ILanguage {
  english_name: string;
};

export interface IDetail {
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  tagline: string;
  vote_average: number;
  runtime: number;
  original_title: string;
  original_name: string;
  original_language: string;
  spoken_languages: ILanguage[];
  genres: IGenres[];
  number_of_episodes: number;
  number_of_seasons: number;
};

export function getDB(media: string, type: string) {
  return fetch(`${BASE_PATH}/${media}/${type}?page=1&api_key=${API_KEY}&include_adult=false&page=1&region=kr`).then(
    (response) => response.json()
  );
};

export function getSearchResult(media: string, keyword: string) {
  return fetch(`${BASE_PATH}/search/${media}?api_key=${API_KEY}&query=${keyword}&include_adult=false&region=kr`).then(
    (response) => response.json()
  );
};

export function getDetail(media: string, id: string | undefined) {
  return fetch(`${BASE_PATH}/${media}/${id}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};

export function makeImagePath(fileName?: string, size?: string) {
  return `https://image.tmdb.org/t/p/${size ? size : 'w300' }${fileName}`;
};
