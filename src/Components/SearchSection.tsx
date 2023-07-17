import styled from "styled-components";
import { IResults, makeImagePath } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Modal from "./Modal";

const SectionWrap = styled.section`
  margin: 50px 0;
`;

const SectionTitle = styled.h2`
  margin-bottom: 16px;
  padding-left: 4px;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;

  strong {
    color: ${(props) => props.theme.blue};
  }

  em {
    margin-left: 7px;
    font-size: 18px;
    font-weight: normal;
    color: #888;
  }
`;

const SectionContent = styled.div`
  position: relative;
`;

const SectionSlider = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 33%;
`;

const SectionList = styled(motion.ul)`
  display: grid;
  position: absolute;
  grid-template-columns: repeat(6, 16%);
  justify-content: space-between;
  width: 100%;
`;

const SectionItem = styled(motion.li)`
  opacity: .75;
  cursor: pointer;
`;

const ItemImage = styled(motion.div)<{ $bgImage: string }>`
  height: 0;
  padding-top: 150%;
  border-radius: 12px;
  background: #262626 url(${(props) => props.$bgImage}) no-repeat center top / cover;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const ItemInfo = styled.div`
  padding: 8px 4px;
`;

const Title = styled.h3`
  display: -webkit-box;
  width: 100%;
  font-size: 18px;
  line-height: 25px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Overview = styled.div`
  display: -webkit-box;
  margin-top: 5px;
  font-size: 13px;
  line-height: 16px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ButtonSlider = styled.button`
  position: absolute;
  top: 33%;
  width: 46px;
  height: 46px;
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

interface ISearchSection {
  data: IResults[] | undefined;
  title?: any;
  media: string;
  keyword: string;
};

const slideNum = 6;

function SearchSection({ data, title, media, keyword }: ISearchSection) {
  //for slide
  let hasButton = true;
  if (data && data?.length < slideNum * 2) {hasButton = false; }
  const numResult = () => {
    if (data) {
      if (data.length <= slideNum) {
        return data?.length;
      } else {
        return Math.floor(data.length / slideNum) * slideNum;
      }
    }
  }
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
  const openModal = (id: number) => {
    history.push(`/search/${media}/${id}?keyword=${keyword}`)
  };
  const modalMatch = useRouteMatch<{id: string}>(`/search/${media}/:id`);
  const clickedId = modalMatch?.params.id;
  const clickedMovie = clickedId && data?.find((item) => item.id === +clickedId);

  return (
    <>
      <SectionWrap>
        <SectionTitle>
          <span>{title}</span>
          <em>({numResult() as number})</em>
        </SectionTitle>
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
                      whileHover={{ opacity: 1 }}
                      onClick={() => openModal(item.id)}
                    >
                      <ItemImage
                        $bgImage={makeImagePath(item.poster_path)}
                        layoutId={`${media}${item.id}`}
                      >
                      </ItemImage>
                      <ItemInfo>
                        <Title>{media.includes("tv") ? item.name : item.title}</Title>
                        <Overview>{item.overview}</Overview>
                      </ItemInfo>
                    </SectionItem>
                ))}
              </SectionList>
            </AnimatePresence>
          </SectionSlider>
          {hasButton && (
            <>
              <ButtonPrev onClick={() => changeSlide("prev")} aria-label="prev" />
              <ButtonNext onClick={() => changeSlide("next")} aria-label="next" />
            </>
          )}
        </SectionContent>
      </SectionWrap>

      <AnimatePresence>
        {modalMatch && clickedMovie ? (
          <Modal
            clickedMovie={clickedMovie}
            currentLayoutId={`${media}${clickedId}`}
            media={media}
            closeUrl={`/search?keyword=${keyword}`}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
};

export default SearchSection;
