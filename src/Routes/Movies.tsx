
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
  const MEDIA = "movie"

  const useMultipleQuery = () => {
    const queryNow = useQuery<IGetDB>( ["movieNow"], () => getDB(MEDIA, "now_playing"), { staleTime: Infinity });
    const queryTop = useQuery<IGetDB>( ["movieTop"], () => getDB(MEDIA, "top_rated"), { staleTime: Infinity });
    const queryUpcoming = useQuery<IGetDB>( ["movieUpcoming"], () => getDB(MEDIA, "upcoming"), { staleTime: Infinity });
    const queryPopular = useQuery<IGetDB>( ["moviePopular"], () => getDB(MEDIA, "popular"), { staleTime: Infinity });
    
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
            media={MEDIA}
          />

          <Section
            data={dataNow?.results.slice(1, dataNow.results.length)}
            title={"NOW PLAYING"}
            media={MEDIA}
            sectionId={"now"}
          />

          <Section
            data={dataTop?.results}
            title={"TOP RATED"}
            media={MEDIA}
            sectionId={"top"}
          />

          <Section
            data={dataUpcoming?.results}
            title={"UPCOMING"}
            media={MEDIA}
            sectionId={"upcoming"}
          />

          <Section
            data={dataPopular?.results}
            title={"POPULAR"}
            media={MEDIA}
            sectionId={"popular"}
          />
        </>
      )}
    </>
  );
}

export default Movies;
