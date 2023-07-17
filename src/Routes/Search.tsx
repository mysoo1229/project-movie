import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Section from "../Components/Section";
import { IGetDB, getSearchResult } from "../api";
import { useQuery } from "react-query";
import { useEffect } from "react";
import SearchSection from "../Components/SearchSection";

const Loading = styled.div`
  padding-top: 50px;
  text-align: center;
  font-size: 17px;
`;

const NoResult = styled.div`
  padding: 50px 0;
  text-align: center;
  font-size: 17px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const useMultipleQuery = () => {
    const queryMovie = useQuery<IGetDB>( ["searchMovie", keyword], () => getSearchResult("movie", keyword || ""));
    const queryTv = useQuery<IGetDB>( ["searchTv", keyword], () => getSearchResult("tv", keyword || ""));
    
    return [queryMovie, queryTv];
  };
  const [
    { data: dataMovie, isLoading: isLoadingMovie },
    { data: dataTv, isLoading: isLoadingTv },
  ] = useMultipleQuery();
  const isLoading = isLoadingMovie || isLoadingTv;
  const noResultMovie = dataMovie?.results.length === 0;
  const noResultTv = dataTv?.results.length === 0;

  return (
    <>
      {isLoading ? (
        <Loading>Loading search results...</Loading>
      ) : 
        keyword ? (
        <>
          {noResultMovie ? (
            <NoResult>Sorry, there is no movie matching your search.</NoResult>
          ) : (
            <SearchSection
              data={dataMovie?.results}
              title={<>Movie Results for <strong>'{keyword}'</strong></>}
              media="movie"
              keyword={keyword}
            />
          )}

          {noResultTv ? (
            <NoResult>Sorry, there is no TV Show matching your search.</NoResult>
          ) : (
            <SearchSection
              data={dataTv?.results}
              title={<>TV Show Results for <strong>'{keyword}'</strong></>}
              media="tv"
              keyword={keyword}
            />
          )}
        </>
      ) : <Loading>Sorry, it's unavailable</Loading>}
    </>
  );
}

export default Search;
