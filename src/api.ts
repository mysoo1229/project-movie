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
};

export interface IGetDB {
  results: IResults[];
};

export function getDB(media: string, type: string) {
  return fetch(`${BASE_PATH}/${media}/${type}?page=1&api_key=${API_KEY}&language=en&page=1&region=kr`).then(
    (response) => response.json()
  );
};

export function makeImagePath(fileName?: string, size?: string) {
  return `https://image.tmdb.org/t/p/${size ? size : 'w300' }${fileName}`;
};
