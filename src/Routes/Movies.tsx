import starGray from "../resources/star-gray.png";
import starYellow from "../resources/star-yellow.png";
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

const ButtonSlider = styled.button`
  position: absolute;
  top: 50%;
  width: 46px;
  height: 46px;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 1);
  border-radius: 23px;
  opacity: 0.2;
  transition: opacity .2s ease-in-out;

  @media screen and (max-width: 1400px) {
    opacity: 0.4;
  }

  &:hover {
    opacity: .8;
  }

  &::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border-bottom: 2px solid #222;
    border-left: 2px solid #222;
  }
`;

const ButtonPrev = styled(ButtonSlider)`
  left: -60px;

  @media screen and (max-width: 1420px) {
    left: -24px;
  }

  &::after {
    top: 16px;
    left: 18px;
    transform: rotate(45deg);
  }
`;

const ButtonNext = styled(ButtonSlider)`
  right: -60px;

  @media screen and (max-width: 1420px) {
    right: -24px;
  }

  &::after {
    top: 16px;
    left: 12px;
    transform: rotate(225deg);
  }
`;

const ModalBg = styled(motion.div)`
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .8);
`;

const ModalWrap = styled(motion.div)`
  position: relative;
  width: 600px;
  height: 70vh;
  margin: 0 auto;
  background: #222;
  border-radius: 16px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent; 
  }

  &::-webkit-scrollbar-thumb {
    background: #666; 
  }
`;

const ModalCloseButton = styled.button`
  z-index: 100;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, .4);
  color: #fff;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 15px;
    height: 2px;
    top: 15px;
    left: 9px;
    background: #fff;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const ModalImage = styled.div`
  position: relative;
  height: 0;
  padding-top: 56.25%;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 140px;
    background: linear-gradient(to bottom, transparent, #222);
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    object-fit: cover;
  }
`;

const ModalTitle = styled.h3`
  z-index: 1;
  position: absolute;
  bottom: 20px;
  left: 24px;
  width: 80%;
  font-size: 32px;
  line-height: 1.2;
  font-weight: bold;
`;

const ModalText = styled.div`
  display: flex;
  padding: 24px;
  gap: 20px;
`;

const ModalSummary = styled.div`
  flex-shrink: 0;
  width: 65%;
`;

const SummaryInfo = styled.div`
  font-size: 13px;
  line-height: 1.5;
`;

const ModalDetail = styled.div`
  font-size: 13px;
  line-height: 1.5;
`;

const DetailRating = styled.div`
  i {
    display: inline-block;
    position: relative;
    width: 75px;
    height: 15px;
    background: url(${starGray}) repeat-x 0 0 / 15px auto;
    vertical-align: top;
  }

  strong {
    position: absolute;
    height: 15px;
    background: url(${starYellow}) repeat-x 0 0 / 15px auto;
  }

  span {
    display: inline-block;
    margin-left: 6px;
    font-size: 13px;
    line-height: 15px;
    color: ${props => props.theme.blue};
  }
`;

const DetailInfo = styled.div`
  margin-top: 16px;

  strong {
    margin-right: 6px;
    color: ${props => props.theme.blue};

    &::after {
      content: ":";
    }
  }

  span {
    color: #999;
  }
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
          />

          <Section
            data={dataTop as IGetMoviesResult}
            title={"Top Rated"}
          />
        </>
      )}
    </>
  );
}

export default Movies;
