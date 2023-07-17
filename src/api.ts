const API_KEY = "6c61618f0f7e88b0c9c7babe5058cf8f";
const BASE_PATH = "https://api.themoviedb.org/3";

 export interface IResults {
  backdrop_path: string;
  poster_path: string;
  id: number;
  title: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  name: string;
  vote_average: number;
};

export interface IGetDB {
  results: IResults[];
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

export function makeImagePath(fileName?: string, size?: string) {
  return `https://image.tmdb.org/t/p/${size ? size : 'w300' }${fileName}`;
};
