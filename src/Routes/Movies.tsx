
import styled from "styled-components";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
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
    const queryNow = useQuery<IGetMoviesResult>( ["movieNow"], () => getMovies("now_playing"), { staleTime: Infinity });
    const queryTop = useQuery<IGetMoviesResult>( ["movieTop"], () => getMovies("top_rated"), { staleTime: Infinity });
    const queryUpcoming = useQuery<IGetMoviesResult>( ["movieUpcoming"], () => getMovies("upcoming"), { staleTime: Infinity });
    const queryPopular = useQuery<IGetMoviesResult>( ["moviePopular"], () => getMovies("popular"), { staleTime: Infinity });
    
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
            data={dataNow?.results[3]}
          />

          <Section
            data={dataNow?.results.filter((item, index) => index !== 3)}
            title={"Now Playing"}
            sectionId={"now"}
          />

          <Section
            data={dataTop?.results}
            title={"Top Rated"}
            sectionId={"top"}
          />

          <Section
            data={dataUpcoming?.results}
            title={"Upcoming"}
            sectionId={"up"}
          />

          <Section
            data={dataPopular?.results}
            title={"Popular"}
            sectionId={"popular"}
          />
        </>
      )}
    </>
  );
}

export default Movies;
