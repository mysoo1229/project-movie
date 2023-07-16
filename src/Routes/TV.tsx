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
  //쿼리 호출
  const useMultipleQuery = () => {
    const queryToday = useQuery<IGetDB>( ["tvToday"], () => getDB("tv", "airing_today"), { staleTime: Infinity });
    const queryTop = useQuery<IGetDB>( ["tvTop"], () => getDB("tv", "top_rated"), { staleTime: Infinity });
    const queryPopular = useQuery<IGetDB>( ["tvPopular"], () => getDB("tv", "popular"), { staleTime: Infinity });
    const queryOn = useQuery<IGetDB>( ["tvOn"], () => getDB("tv", "on_the_air"), { staleTime: Infinity });
    
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
        <Loading>Loading movies...</Loading>
      ) : (
        <>
          <Banner
            data={dataTop?.results[0]}
            media={"tv"}
          />

          <Section
            data={dataTop?.results.slice(1, dataTop.results.length)}
            title={"Top Rated"}
            media={"tv"}
            sectionId={"top"}
          />

          <Section
            data={dataOn?.results}
            title={"On The Air"}
            media={"tv"}
            sectionId={"on"}
          />

          <Section
            data={dataToday?.results}
            title={"Airing Today"}
            media={"tv"}
            sectionId={"today"}
          />

          <Section
            data={dataPopular?.results}
            title={"Popular"}
            media={"tv"}
            sectionId={"popular"}
          />
        </>
      )}
    </>
  );
}

export default Tv;
