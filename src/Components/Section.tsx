import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IResults, makeImagePath } from "../api";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useHistory, useRouteMatch } from "react-router-dom";
import { debounce } from 'lodash';

const SectionWrap = styled.section`
  margin: 50px 0;
`;

const SectionTitle = styled.h2`
  margin-bottom: 16px;
  padding-left: 4px;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;

  @media screen and (max-width: 640px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

const SectionContent = styled.div`
  position: relative;
`;

const SectionSlider = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 24%;

  @media screen and (max-width: 1024px) {
    padding-bottom: 50%;
  }
`;

const SectionList = styled(motion.ul)`
  display: grid;
  position: absolute;
  grid-template-columns: repeat(6, 16%);
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 32%);
  }
`;

const SectionItem = styled(motion.li)<{ $bgImage: string }>`
  padding-top: 150%;
  border-radius: 12px;
  background: #262626 url(${(props) => props.$bgImage}) no-repeat center top / cover;
  cursor: pointer;

  &:first-child {
    transform-origin: center left !important;
  }

  &:last-child {
    transform-origin: center right !important;
  }
`;

const ItemInfo = styled(motion.div)`
  position: absolute;
  width: 100%;
  bottom: -1px;
  padding: 18px 12px;
  background: rgba(0, 0, 0, .8);
  border-radius: 0 0 12px 12px;
  text-align: center;
  opacity: 0;

  h3 {
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  @media screen and (max-width: 640px) {
    h3 {
      font-size: 13px;
      line-height: 16px;
      letter-spacing: 2px;
    }
  }
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

  @media screen and (max-width: 1400px) {
    opacity: 0.3;
  }

  @media screen and (max-width: 640px) {
    width: 36px;
    height: 36px;

    &::after {
      width: 8px;
      height: 8px;
    }
  }
`;

const ButtonPrev = styled(ButtonSlider)`
  left: -60px;

  &::after {
    top: 16px;
    left: 18px;
    transform: rotate(45deg);
  }

  @media screen and (max-width: 1420px) {
    left: -24px;
  }

  @media screen and (max-width: 640px) {
    left: -18px;

    &::after {
      top: 13px;
      left: 15px;
    }
  }
`;

const ButtonNext = styled(ButtonSlider)`
  right: -60px;

  &::after {
    top: 16px;
    left: 12px;
    transform: rotate(225deg);
  }

  @media screen and (max-width: 1420px) {
    right: -24px;
  }

  @media screen and (max-width: 640px) {
    right: -18px;
  
    &::after {
      top: 13px;
      left: 11px;
    }
  }
`;

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

const listVariants = {
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

interface ISection {
  data: IResults[] | undefined;
  title: any;
  sectionId: string;
  media: string;
};

function Section({ data, title, media, sectionId }: ISection) {
  //for responsive
  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
  const handleResize = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, 300);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  },[]);

  let slideNum = 6;
  if (windowWidth < 1024) slideNum = 3;

  //for slider
  const [ slideIndex, setSlideIndex ] = useState(0);
  const [ leaving, setLeaving ] = useState(false);
  const [ backward, setBackward ] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const changeSlide = (direction: string) => {
    if (!data || leaving) return;

    const totalMovieNum = data?.length;
    const maxIndex = Math.floor(totalMovieNum / slideNum) - 1;

    if (direction === "prev") {
      setBackward(true);
      setLeaving(true);
      setSlideIndex((prev) => prev === 0 ? maxIndex : prev - 1);
    } else {
      setBackward(false);
      setLeaving(true);
      setSlideIndex((prev) => prev === maxIndex ? 0 : prev + 1);
    }
  };

  //for modal
  const history = useHistory();
  const modalMatch = useRouteMatch<{movieId: string}>(`/${media}/${sectionId}/:movieId`);
  const openModal = (movieId: number, media: string) => {
    history.push(`/${media}/${sectionId}/${movieId}`)
  }
  const clickedId = modalMatch?.params.movieId;

  return (
    <>
      <SectionWrap>
        <SectionTitle>{title}</SectionTitle>
        <SectionContent>
          <SectionSlider style={{ overflow: leaving ? 'hidden' : 'visible' }}>
            <AnimatePresence
                initial={false}
                onExitComplete={toggleLeaving}
                custom={backward}
            >
              <SectionList
                key={slideIndex}
                variants={listVariants}
                initial="initial"
                animate="visible"
                exit="exit"
                transition={{ type: "linear", duration: .5 }}
                custom={backward}
              >
                {data &&
                  data
                  .slice(slideIndex * slideNum, slideIndex * slideNum + slideNum)
                  .map((item) => (
                    <SectionItem
                      key={item.id}
                      $bgImage={makeImagePath(item.poster_path)}
                      variants={itemVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{type: "tween"}}
                      onClick={() => openModal(item.id, media)}
                      layoutId={`${sectionId}${item.id}`}
                    >
                      <ItemInfo variants={infoVariants}>
                        <h3>{media.includes("tv") ? item.name : item.title}</h3>
                      </ItemInfo>
                    </SectionItem>
                ))}
              </SectionList>
            </AnimatePresence>
          </SectionSlider>
          <ButtonPrev onClick={() => changeSlide("prev")} aria-label="prev" />
          <ButtonNext onClick={() => changeSlide("next")} aria-label="next" />
        </SectionContent>
      </SectionWrap>

      <AnimatePresence>
        {modalMatch ? (
          <Modal
            clickedId={clickedId}
            currentLayoutId={`${sectionId}${clickedId}`}
            media={media}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Section;
