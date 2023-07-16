
import styled from "styled-components";
import { useQuery } from "react-query";
import { IMovie, getMovies, IGetMoviesResult, makeImagePath } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { SyntheticEvent, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import Section from "../Components/Section";

const Loading = styled.div`
  padding-top: 50px;
  text-align: center;
  font-size: 17px;
`;

const MainVisual = styled.div<{ $bgImage: string | undefined }>`
  position: relative;
  width: 100%;
  height: 65vh;
  margin-bottom: 60px;
  border-radius: 16px;
  overflow: hidden;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .6));
  }
`;

const VisualInner = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 45%;
  padding: 50px 30px;
`;

const VisualTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
`;

const VisualOverview = styled.div`
  display: -webkit-box;
  width: 100%;
  margin-top: 16px;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 15px;
  line-height: 22px;
`;

const VisualButton = styled.button`
  display: inline-block;
  margin-top: 16px;
  padding: 0 14px;
  background: rgba(255, 255, 255, .6);
  border-radius: 20px;
  font-size: 15px;
  line-height: 34px;
  font-weight: bold;
  color: #222;
`;

const rowVariants = {
  initial: (backward: boolean) => {
    return {
      x: backward ? -window.innerWidth : window.innerWidth,
    }
  },
  visible: {
    x: 0,
  },
  exit: (backward: boolean) => {
    return {
      x: backward ? window.innerWidth : -window.innerWidth,
    }
  },
};

const itemVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    y: -40,
    scale: 1.15,
    boxShadow: '0 0 5px 3px rgba(0, 0, 0, .4)',
    transition: {
      type: "tween",
      duration: .2,
      delay: .3,
    },
  }
}

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: .2,
      delay: .3,
    },
  },
};

function Movies() {
  //쿼리 호출
  const useMultipleQuery = () => {
    const queryNow = useQuery<IGetMoviesResult>( ["movieNow"], () => getMovies("now_playing"), { staleTime: Infinity });
    const queryTop = useQuery<IGetMoviesResult>( ["movieTop"], () => getMovies("top_rated"), { staleTime: Infinity });

    return [queryNow, queryTop];
  };
  const [
    { data: dataNow, isLoading: isLoadingNow },
    { data: dataTop, isLoading: isLoadingTop },
  ] = useMultipleQuery();
  const isLoading = isLoadingNow || isLoadingTop;

  return (
    <>
      {isLoading ? (
        <Loading>Loading movies...</Loading>
      ) : (
        <>
          <MainVisual $bgImage={makeImagePath(dataNow?.results[3].backdrop_path, "original")}>
            <VisualInner>
              <VisualTitle>{dataNow?.results[3].title}</VisualTitle>
              <VisualOverview>{dataNow?.results[3].overview}</VisualOverview>
              <VisualButton>MORE INFO</VisualButton>
            </VisualInner>
          </MainVisual>

          <Section
            data={dataNow as IGetMoviesResult}
            title={"Now Playing"}
            sectionId={"now"}
          />

          <Section
            data={dataTop as IGetMoviesResult}
            title={"Top Rated"}
            sectionId={"top"}
          />
        </>
      )}
    </>
  );
}

export default Movies;
