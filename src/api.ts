const API_KEY = "6c61618f0f7e88b0c9c7babe5058cf8f";
const BASE_PATH = "https://api.themoviedb.org/3";

 export interface IMovie {
  backdrop_path: string;
  poster_path: string;
  id: number;
  title: string;
  overview: string;
  release_date: string;
};

export interface IGetMoviesResult {
  results: IMovie[];
};

export function getMovies(type: string) {
  return fetch(`${BASE_PATH}/movie/${type}?page=1&api_key=${API_KEY}&language=en&page=1&region=kr`).then(
    (response) => response.json()
  );
};

export function makeImagePath(fileName?: string, size?: string) {
  return `https://image.tmdb.org/t/p/${size ? size : 'w300' }${fileName}`;
};
