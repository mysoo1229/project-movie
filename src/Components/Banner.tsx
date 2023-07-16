import styled from "styled-components";
import { IMovie, makeImagePath } from "../api";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";

const BannerWrap = styled.div<{ $bgImage: string | undefined }>`
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

const BannerInner = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 45%;
  padding: 50px 30px;
`;

const BannerTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
`;

const BannerOverview = styled.div`
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

const BannerButton = styled.button`
  display: inline-block;
  margin-top: 16px;
  padding: 0 14px;
  background: rgba(255, 255, 255, .6);
  border-radius: 20px;
  font-size: 15px;
  line-height: 34px;
  font-weight: bold;
  letter-spacing: .5px;
  color: #222;
`;

interface IBanner {
  data: IMovie | undefined;
};

function Banner({ data }: IBanner) {
  const history = useHistory();
  const openModal = (movieId: number) => history.push(`/movies/banner/${movieId}`);
  const modalMatch = useRouteMatch<{movieId: string}>(`/movies/banner/:movieId`);
  const clickedId = modalMatch?.params.movieId;

  return (
    <>
      <BannerWrap $bgImage={makeImagePath(data?.backdrop_path, "original")}>
        {data && (
          <BannerInner>
            <BannerTitle>{data.title}</BannerTitle>
            <BannerOverview>{data.overview}</BannerOverview>
            <BannerButton onClick={() => openModal(data.id)}>MORE INFO</BannerButton>
          </BannerInner>
        )}
      </BannerWrap>

      <AnimatePresence>
        {modalMatch && data ? (
          <Modal
            clickedMovie={data}
            currentLayoutId={`now${clickedId}`}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Banner;
