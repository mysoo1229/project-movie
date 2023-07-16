import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Section from "../Components/Section";
import { IGetDB, getSearchResult } from "../api";
import { useQuery } from "react-query";
import { useEffect } from "react";

const Loading = styled.div`
  padding-top: 50px;
  text-align: center;
  font-size: 17px;
`;

const ResultList = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 16%));
  gap: 60px 0;
  justify-content: space-between;
`;

const ItemImage = styled.div`
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const ItemInfo = styled.div`
  padding: 8px 4px;
`;

const Title = styled.h3`
  width: 100%;
  font-size: 20px;
  line-height: 25px;
  font-weight: bold;
`;

const Overview = styled.div`
  display: -webkit-box;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 13px;
  line-height: 16px;
  color: #999;
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
            <Section
              data={dataMovie?.results}
              title={["Movie Results for '", <strong>{keyword}</strong>, "'"]}
              media={"search_movie"}
              sectionId={"movie"}
            />
          )}

          {noResultTv ? (
            <NoResult>Sorry, there is no TV show matching your search.</NoResult>
          ) : (
            <Section
              data={dataTv?.results}
              title={["TV Show Results for '", <strong>{keyword}</strong>, "'"]}
              media={"search_tv"}
              sectionId={"tv"}
            />
          )}
        </>
      ) : <Loading>Sorry, it's unavailable</Loading>}
    </>
  );
}

export default Search;
