import styled from "styled-components";
import { IResults, makeImagePath } from "../api";
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

  @media screen and (max-width: 1024px) {
    height: 55vh;
  }
`;

const BannerInner = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  padding: 50px 30px;
`;

const BannerTitle = styled.div`
  width: 60%;
  font-size: 60px;
  font-weight: bold;

  @media screen and (max-width: 1024px) {
    width: 70%;
    font-size: 40px;
  }

  @media screen and (max-width: 640px) {
    font-size: 28px;
  }
`;

const BannerOverview = styled.div`
  display: -webkit-box;
  width: 45%;
  margin-top: 16px;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 15px;
  line-height: 22px;

  @media screen and (max-width: 1024px) {
    width: 60%;
  }

  @media screen and (max-width: 640px) {
    width: 90%;
    font-size: 13px;
    line-height: 18px;
  }
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
  data: IResults | undefined;
  media: string;
};

function Banner({ data, media }: IBanner) {
  const history = useHistory();
  const currentId = data && data.id;
  const openModal = (currentId: number) => history.push(`/${media}/banner/${currentId}`);
  const modalMatch = useRouteMatch<{currentId: string}>(`/${media}/banner/${currentId}`);
  const clickedId = modalMatch?.params.currentId;

  return (
    <>
      <BannerWrap $bgImage={makeImagePath(data?.backdrop_path, "original")}>
        {data && (
          <BannerInner>
            <BannerTitle>{media === "tv" ? data.name : data.title}</BannerTitle>
            <BannerOverview>{data.overview}</BannerOverview>
            <BannerButton onClick={() => openModal(data.id)}>MORE INFO</BannerButton>
          </BannerInner>
        )}
      </BannerWrap>

      <AnimatePresence>
        {modalMatch ? (
          <Modal
            clickedId={currentId + ""}
            currentLayoutId={`now${clickedId}`}
            media={media}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Banner;
