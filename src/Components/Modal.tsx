import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import starGray from "../resources/star-gray.png";
import starYellow from "../resources/star-yellow.png";
import { useHistory } from "react-router-dom";
import { IResults } from "../api";
import { makeImagePath } from "../api";
import { SyntheticEvent } from "react";

const ModalBg = styled(motion.div)`
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .8);
  opacity: 0;
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

  @media screen and (max-width: 640px) {
    height: 100vh;
    border-radius: 0;
  }
`;

const ModalCloseButton = styled.button`
  z-index: 100;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: rgba(34, 34, 34, .7);
  color: #fff;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 17px;
    height: 2px;
    top: 17px;
    left: 10px;
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
  background-color: #262626;

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
  width: calc(100% - 220px);
  font-size: 32px;
  line-height: 1.2;
  font-weight: bold;
`;

const ModalText = styled.div`
  display: flex;
  padding: 24px;
  gap: 24px;
  justify-content: space-between;
`;

const ModalInfo = styled.div`
  font-size: 13px;
`;

const InfoDetail = styled.div`
  display: flex;
  margin-bottom: 24px;

  @media screen and (max-width: 640px) {
    display: block;
  }
`;

const InfoRating = styled.div`
  margin-right: 24px;

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
    line-height: 16px;
    color: ${props => props.theme.blue};
  }

  @media screen and (max-width: 640px) {
    margin-bottom: 8px;
  }
`;

const InfoDate = styled.div`
  strong {
    margin-right: 6px;
    color: ${props => props.theme.blue};
    vertical-align: top;
    line-height: 16px;

    &::after {
      content: ":";
    }
  }

  span {
    line-height: 16px;
    color: #999;
  }
`;

const InfoOverview = styled.div`
  line-height: 1.5;
`;

const ModalPoster = styled.div`
  width: 150px;
  flex-shrink: 0;
`;

const PosterWrap = styled.div`
  z-index: 1;
  position: relative;
  width: 150px;
  height: 225px;
  margin: -80px 0 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 5px 3px rgba(34, 34, 34, .2);

  img {
    width: 100%;
  }
`;

interface IModal {
  clickedMovie: IResults | undefined;
  currentLayoutId: string;
  media: string;
  closeUrl?: string;
}

function Modal({ clickedMovie, currentLayoutId, media, closeUrl }: IModal) {
  const history = useHistory();
  const closeModal = () => {
    if (closeUrl) {
      history.push(closeUrl);
    } else if (media === "movie") {
      history.push("/");
    } else {
      history.push(`/${media}`);
    }
  }
  const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/images/blank.gif";
  };

  return (
    <ModalBg
      onClick={closeModal}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <ModalWrap
        onClick={(e) => e.stopPropagation()}
        layoutId={currentLayoutId}
      >
        <ModalCloseButton onClick={closeModal} aria-label="Close Modal" />
        { clickedMovie && (
          <>
          <ModalImage>
            <img
              src={makeImagePath(clickedMovie.backdrop_path, 'original')}
              onError={handleImgError}
              alt="movie image"
            />
            <ModalTitle>{media.includes("tv") ? clickedMovie.name : clickedMovie.title}</ModalTitle>
          </ModalImage>
          <ModalText>
            <ModalInfo>
              <InfoDetail>
                <InfoRating>
                  <i>
                    <strong style={{width: `${clickedMovie.vote_average * 10}%`}}></strong>
                  </i>
                  <span>({clickedMovie.vote_average})</span>
                </InfoRating>
                <InfoDate>
                  <strong>Release Date</strong>
                  <span>{media.includes("tv") ?  clickedMovie.first_air_date : clickedMovie.release_date}</span>
                </InfoDate>
              </InfoDetail>
              <InfoOverview>{clickedMovie.overview}</InfoOverview>
            </ModalInfo>
            <ModalPoster>
              <PosterWrap>
                <img 
                  src={makeImagePath(clickedMovie.poster_path, 'w300')}
                  onError={handleImgError}
                  alt="movie poster"
                />
              </PosterWrap>
            </ModalPoster>
          </ModalText>
          </>
        )}
      </ModalWrap>
    </ModalBg>
  );
}

export default Modal;
