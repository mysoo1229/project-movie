import starGray from "../resources/star-gray.png";
import starYellow from "../resources/star-yellow.png";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult, makeImagePath } from "../api";
import { motion, AnimatePresence} from "framer-motion";
import { useState } from "react";

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

const Section = styled.section`
  margin: 40px 0;
`;

const SectionTitle = styled.h2`
  margin-bottom: 16px;
  padding-left: 4px;
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionContent = styled.div`
  position: relative;
`;

const SectionSlider = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 24%;
  overflow: hidden;
`;

const SectionList = styled(motion.ul)`
  position: relative;
  display: grid;
  position: absolute;
  grid-template-columns: repeat(6, 16%);
  justify-content: space-between;
  width: 100%;
`;

const SectionItem = styled(motion.li)`
  position: relative;
  cursor: pointer;
`;

const ItemImage = styled.div`
  position: relative;
  height: 0;
  padding-top: 150%;
  border-radius: 12px;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  display: none;
  margin-top: 6px;
  padding: 10px 12px;
  background: #222;
  text-align: center;

  h3 {
    display: -webkit-box;
    overflow: hidden;
    word-break: break-word;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 15px;
    line-height: 25px;
    font-weight: bold;
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

const ModalBg = styled.div`
  z-index: 99;
  display: flex;
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .8);
`;

const ModalWrap = styled.div`
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
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, .4);
  color: #fff;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 15px;
    height: 2px;
    top: 14px;
    left: 8px;
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
    height: 80px;
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

const ModalText = styled.div`
  display: flex;
  padding: 24px;
  gap: 20px;
`;

const ModalSummary = styled.div`
  flex-shrink: 0;
  width: 65%;
`;

const SummaryTitle = styled.h3`
  font-size: 28px;
  font-weight: bold;
`;

const SummaryInfo = styled.div`
  margin-top: 12px;
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

const slideNum = 6;

function Movies() {
  const [ slideIndex, setSlideIndex ] = useState(0);
  const [ leaving, setLeaving ] = useState(false);
  const [ backward, setBackward ] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies, 
    { staleTime: Infinity }
  );

  const moveNowPlaying = (direction: string) => {
    if (!data || leaving) return;

    const totalMovieNum = data?.results.length;
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

  const resultNowPlaying = data?.results
    .filter((item, index) => index !== 3)
    .slice(slideIndex*slideNum, slideIndex*slideNum + slideNum);

  return (
    <>
      {isLoading ? (
        <Loading>Loading movies...</Loading>
      ) : (
        <>
          <MainVisual $bgImage={makeImagePath(data?.results[3].backdrop_path, "original")}>
            <VisualInner>
              <VisualTitle>{data?.results[3].title}</VisualTitle>
              <VisualOverview>{data?.results[3].overview}</VisualOverview>
              <VisualButton>MORE INFO</VisualButton>
            </VisualInner>
          </MainVisual>

          <Section>
            <SectionTitle>Now Playing</SectionTitle>
            <SectionContent>
              <SectionSlider>
                <AnimatePresence
                  initial={false}
                  onExitComplete={toggleLeaving}
                  custom={backward}
                >
                  <SectionList
                    key={slideIndex}
                    variants={rowVariants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "linear" }}
                    custom={backward}
                  >
                    {resultNowPlaying?.map((item, index) => (
                      <SectionItem key={index} style={{color: 'white', fontSize: 18}}>
                        <ItemImage>
                          <img src={makeImagePath(item.poster_path, 'w300')} alt="poster" />
                        </ItemImage>
                        <ItemInfo>
                          {/* <h3>{item.title}</h3> */}
                        </ItemInfo>
                      </SectionItem>
                    ))}
                  </SectionList>
                </AnimatePresence>
              </SectionSlider>
              <ButtonPrev onClick={() => moveNowPlaying("prev")} aria-label="prev" />
              <ButtonNext onClick={() => moveNowPlaying("next")} aria-label="next" />
            </SectionContent>
          </Section>

          <ModalBg>
            <ModalWrap>
              <ModalCloseButton />
              <ModalImage>
                <img src="https://assets.website-files.com/6024f92b17cc648cdd48d5de/6440ea081c857f6a97c00484_Elemental%20pixar%20animation%20in%20Cannes%20for%20MIME.jpg" alt="" />
              </ModalImage>
              <ModalText>
                <ModalSummary>
                  <SummaryTitle>Elemental</SummaryTitle>
                  <SummaryInfo>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, autem nobis! Asperiores, eius! Libero rem sapiente officiis molestiae fugiat impedit unde dolore illo minima, amet magni architecto adipisci inventore vero? Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, autem nobis! Asperiores, eius! Libero rem sapiente officiis molestiae fugiat impedit unde dolore illo minima, amet magni architecto adipisci inventore vero?</SummaryInfo>
                </ModalSummary>
                <ModalDetail>
                  <DetailRating>
                    <i>
                      <strong style={{width: '70%'}}></strong>
                    </i>
                    <span>(3.5)</span>
                  </DetailRating>
                  <DetailInfo>
                    <strong>Cast</strong>
                    <span>like what, djksd, allsd, we, aslef, asdfef, asef sdl, dfsd</span>
                  </DetailInfo>
                  <DetailInfo>
                    <strong>Genre</strong>
                    <span>like what, djksd, allsd, we, aslef, asdfef, asef sdl, dfsd</span>
                  </DetailInfo>
                </ModalDetail>
              </ModalText>
            </ModalWrap>
          </ModalBg>
        </>
      )}
    </>
  );
}

export default Movies;
