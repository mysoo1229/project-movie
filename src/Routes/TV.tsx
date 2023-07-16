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

function Tv() {
  const MEDIA = "tv";
  const useMultipleQuery = () => {
    const queryToday = useQuery<IGetDB>( ["tvToday"], () => getDB(MEDIA, "airing_today"), { staleTime: Infinity });
    const queryTop = useQuery<IGetDB>( ["tvTop"], () => getDB(MEDIA, "top_rated"), { staleTime: Infinity });
    const queryPopular = useQuery<IGetDB>( ["tvPopular"], () => getDB(MEDIA, "popular"), { staleTime: Infinity });
    const queryOn = useQuery<IGetDB>( ["tvOn"], () => getDB(MEDIA, "on_the_air"), { staleTime: Infinity });
    
    return [queryToday, queryTop, queryPopular, queryOn];
  };
  const [
    { data: dataToday, isLoading: isLoadingToday },
    { data: dataTop, isLoading: isLoadingTop },
    { data: dataPopular, isLoading: isLoadingPopular },
    { data: dataOn, isLoading: isLoadingOn },
  ] = useMultipleQuery();
  const isLoading = isLoadingToday || isLoadingTop || isLoadingPopular || isLoadingOn;

  return (
    <>
      {isLoading ? (
        <Loading>Loading TV shows...</Loading>
      ) : (
        <>
          <Banner
            data={dataTop?.results[0]}
            media={MEDIA}
          />

          <Section
            data={dataTop?.results.slice(1, dataTop.results.length)}
            title={"TOP RATED"}
            media={MEDIA}
            sectionId={"top"}
          />

          <Section
            data={dataOn?.results}
            title={"ON THE AIR"}
            media={MEDIA}
            sectionId={"onair"}
          />

          <Section
            data={dataToday?.results}
            title={"AIRING TODAY"}
            media={MEDIA}
            sectionId={"today"}
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

export default Tv;
