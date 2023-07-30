import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IGetDB, getSearchResult } from "../api";
import { useQuery } from "react-query";
import SearchSection from "../Components/SearchSection";
import { useState } from "react";

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

const TabList = styled.div`
  margin-top: 20px;
`;

const TabItem = styled.button<{$isActive: boolean}>`
  margin-right: 12px;
  padding: 6px 10px;
  border: 1px solid ${(props) => props.$isActive === true ? props.theme.blue : '#bbb'};
  border-radius: 20px;
  background: ${(props) => props.$isActive === true ? props.theme.blue : 'transparent'};
  font-size: 15px;
  font-weight: ${(props) => props.$isActive === true ? 'bold' : 'normal'};
  color: ${(props) => props.$isActive === true ? '#222' : '#ddd'};
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
  const [activeTab, setActivTab] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loading>Loading search results...</Loading>
      ) : 
        keyword ? (
        <>
          <TabList>
            {["Movies", "TV Shows"].map((tab, index) => (
              <TabItem
                key={tab}
                $isActive={activeTab === index ? true : false }
                onClick={() => setActivTab(index)}
              >
                {tab}
              </TabItem>
            ))}
          </TabList>
          {activeTab === 0 ? (
            noResultMovie ? (
              <NoResult>Sorry, there is no movie matching '{keyword}'.</NoResult>
            ) : (
              <SearchSection
                data={dataMovie?.results}
                title={<>Movie Results for <strong>'{keyword}'</strong></>}
                media="movie"
                keyword={keyword}
              />
            )
          ) : (
            noResultTv ? (
              <NoResult>Sorry, there is no TV Show matching '{keyword}'.</NoResult>
            ) : (
              <SearchSection
                data={dataTv?.results}
                title={<>TV Show Results for <strong>'{keyword}'</strong></>}
                media="tv"
                keyword={keyword}
              />
            )
          )}
        </>
      ) : <Loading>Sorry, it's unavailable</Loading>}
    </>
  );
}

export default Search;
