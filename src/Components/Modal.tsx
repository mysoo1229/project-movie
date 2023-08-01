import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import starGray from "../resources/star-gray.png";
import starYellow from "../resources/star-yellow.png";
import { useHistory } from "react-router-dom";
import { IDetail, getDetail } from "../api";
import { makeImagePath } from "../api";
import { useQuery } from "react-query";

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
  padding-top: 300px;
  background-color: #333;
  border-radius: 16px 16px 0 0;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 170px;
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

const ModalOrgTitle = styled.div`
  margin-top: 6px;
  font-size: 16px;
  font-weight: normal;
  color: #ccc;
`;

const ModalInfo = styled.div`
  display: flex;
  height: calc(70vh - 300px);
  padding: 24px;
  gap: 26px;
  justify-content: space-between;
`;

const InfoText= styled.div`
  overflow-y: auto;
  padding-right: 10px;
  font-size: 15px;

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
    overflow-y: visible;
  }
`;

const InfoGenre = styled.div`
  span {
    display: inline-flex;
    margin-right: 8px;
    padding: 4px 5px;
    border: 1px solid #888;
    border-radius: 6px;
    font-size: 13px;
    color: #ccc;
  }
`;

const InfoDetail = styled.div`
  display: flex;
  margin-top: 14px;

  span {
    font-size: 13px;
    color: #ccc;

    + span {
      display: flex;
      align-items: center;

      &::before {
        content: "";
        display: inline-flex;
        width: 2px;
        height: 2px;
        margin: 0 6px;
        border-radius: 2px;
        background: #999;
      }
    }
  }
`;

const InfoTagline = styled.div`
  margin-top: 24px;
  font-weight: bold;

  i {
    display: block;
    height: 34px;
    font-size: 46px;
    color: ${props => props.theme.blue};
  }

  div {
    font-size: 20px;
    line-height: 1.2;
    color: ${props => props.theme.blue};
  }
`;

const InfoOverview = styled.div`
  margin-top: 24px;
  padding-bottom: 10px;
  line-height: 1.5;
  overflow-y: auto;
`;

const InfoPoster = styled.div`
  width: 150px;
  flex-shrink: 0;
`;

const PosterWrap = styled.div`
  z-index: 1;
  position: relative;
  width: 150px;
  height: 225px;
  margin: -80px 0 16px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 5px 3px rgba(34, 34, 34, .2);
  background: #333;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoRating = styled.div`
  display: flex;
  justify-content: center;

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
    font-size: 15px;
    line-height: 16px;
    color: ${props => props.theme.blue};
  }

  @media screen and (max-width: 640px) {
    margin-bottom: 8px;
  }
`;

interface IModal {
  clickedId?: string;
  currentLayoutId: string;
  media: string;
  closeUrl?: string;
}

function Modal({ clickedId, currentLayoutId, media, closeUrl }: IModal) {
  const { data: detail } = useQuery<IDetail>(["detail"], () => getDetail(media, clickedId));
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
        { detail && (
          <>
          <ModalImage>
            {detail.backdrop_path && (
              <img
                src={makeImagePath(detail.backdrop_path, 'w500')}
                alt="movie image"
              />
            )}
            <ModalTitle>
              {media.includes("tv") ? detail.name : detail.title}
              {detail.original_language !== "en" && (
                <ModalOrgTitle>({media.includes("tv") ? detail.original_name : detail.original_title})</ModalOrgTitle>
              )}
            </ModalTitle>
          </ModalImage>
          <ModalInfo>
            <InfoText>
              {detail.genres ? (
                <InfoGenre>
                  {detail.genres.slice(0, 3).map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </InfoGenre>
              ) : null}
              <InfoDetail>
                {!!detail.runtime && <span>{detail.runtime} min</span>}
                {detail.number_of_seasons &&  detail.number_of_seasons > 1 ? (
                  <span>{detail.number_of_seasons} 'Seasons'</span>
                ) : null}
                {detail.number_of_seasons && detail.number_of_seasons === 1 && detail.number_of_episodes ? (
                  <span>{detail.number_of_episodes} {detail.number_of_episodes > 1 ? 'Epsiodes' : 'Epsiode'}</span>
                ) : null}
                {!!detail.first_air_date && <span>{detail.first_air_date}</span>}
                {!!detail.release_date && <span>{detail.release_date}</span>}
                {!!detail.spoken_languages[0] && (
                  <span>
                    {detail.spoken_languages[0].english_name}
                  </span>
                )}
              </InfoDetail>
              {detail.tagline && (
                <InfoTagline>
                  <i>&#10077;</i>
                  <div>{detail.tagline}</div>
                </InfoTagline>
              )}
              <InfoOverview>{detail.overview}</InfoOverview>
            </InfoText>
            <InfoPoster>
              <PosterWrap>
                {detail.poster_path && (
                  <img 
                    src={makeImagePath(detail.poster_path, 'w300')}
                    alt="movie poster"
                  />
                )}
              </PosterWrap>
              {detail.vote_average ? (
                <InfoRating>
                  <i>
                    <strong style={{width: `${Math.round(detail.vote_average) * 10}%`}}></strong>
                  </i>
                  <span>({Math.round(detail.vote_average * 10) / 10})</span>
                </InfoRating>
              ) : null}
            </InfoPoster>
          </ModalInfo>
          </>
        )}
      </ModalWrap>
    </ModalBg>
  );
}

export default Modal;
