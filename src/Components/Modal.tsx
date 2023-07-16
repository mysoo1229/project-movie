import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import starGray from "../resources/star-gray.png";
import starYellow from "../resources/star-yellow.png";
import { useHistory } from "react-router-dom";
import { IMovie } from "../api";
import { makeImagePath } from "../api";
import { SyntheticEvent } from "react";

const ModalBg = styled(motion.div)`
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .5);
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

interface IModal {
  clickedMovie: IMovie | undefined;
  currentLayoutId: string;
}

function Modal({ clickedMovie, currentLayoutId }: IModal) {
  const history = useHistory();
  const closeModal = () => history.push("/");
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
            <ModalTitle>{clickedMovie.title}</ModalTitle>
          </ModalImage>
          <ModalText>
            <ModalSummary>
              <SummaryInfo>{clickedMovie.overview}</SummaryInfo>
            </ModalSummary>
            <ModalDetail>
              <DetailRating>
                <i>
                  <strong style={{width: '70%'}}></strong>
                </i>
                <span>(3.5)</span>
              </DetailRating>
              <DetailInfo>
                <strong>Release Date</strong>
                <span>{clickedMovie.release_date}</span>
              </DetailInfo>
              <DetailInfo>
                <strong>Genre</strong>
                <span>like what, djksd, allsd, we, aslef, asdfef, asef sdl, dfsd</span>
              </DetailInfo>
            </ModalDetail>
          </ModalText>
          </>
        )}
      </ModalWrap>
    </ModalBg>
  );
}

export default Modal;
