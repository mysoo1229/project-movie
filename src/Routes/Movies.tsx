
import styled from "styled-components";
import { useQuery } from "react-query";
import { getDB, IGetDB } from "../api";
import Banner from "../Components/Banner";
import Section from "../Components/Section";

const Loading = styled.div`
  padding-top: 50px;
  text-align: center;
  font-size: 17px;
`;

function Movies() {
  //쿼리 호출
  const useMultipleQuery = () => {
    const queryNow = useQuery<IGetDB>( ["movieNow"], () => getDB("movie", "now_playing"), { staleTime: Infinity });
    const queryTop = useQuery<IGetDB>( ["movieTop"], () => getDB("movie", "top_rated"), { staleTime: Infinity });
    const queryUpcoming = useQuery<IGetDB>( ["movieUpcoming"], () => getDB("movie", "upcoming"), { staleTime: Infinity });
    const queryPopular = useQuery<IGetDB>( ["moviePopular"], () => getDB("movie", "popular"), { staleTime: Infinity });
    
    return [queryNow, queryTop, queryUpcoming, queryPopular];
  };
  const [
    { data: dataNow, isLoading: isLoadingNow },
    { data: dataTop, isLoading: isLoadingTop },
    { data: dataUpcoming, isLoading: isLoadingUpcoming },
    { data: dataPopular, isLoading: isLoadingPopular },
  ] = useMultipleQuery();
  const isLoading = isLoadingNow || isLoadingTop || isLoadingUpcoming || isLoadingPopular;

  return (
    <>
      {isLoading ? (
        <Loading>Loading movies...</Loading>
      ) : (
        <>
          <Banner
            data={dataNow?.results[0]}
            media={"movie"}
          />

          <Section
            data={dataNow?.results.slice(1, dataNow.results.length)}
            title={"Now Playing"}
            media={"movie"}
            sectionId={"now"}
          />

          <Section
            data={dataTop?.results}
            title={"Top Rated"}
            media={"movie"}
            sectionId={"top"}
          />

          <Section
            data={dataUpcoming?.results}
            title={"Upcoming"}
            media={"movie"}
            sectionId={"up"}
          />

          <Section
            data={dataPopular?.results}
            title={"Popular"}
            media={"movie"}
            sectionId={"popular"}
          />
        </>
      )}
    </>
  );
}

export default Movies;
