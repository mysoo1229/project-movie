import styled from "styled-components";
import { IResults, makeImagePath } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Modal from "./Modal";

const SectionWrap = styled.section`
  margin: 20px 0;
`;

const SectionTitle = styled.h2`
  margin-bottom: 40px;
  padding-left: 4px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;

  strong {
    color: ${(props) => props.theme.blue};
  }

  em {
    margin-left: 7px;
    font-size: 15px;
    font-weight: normal;
    color: #888;
  }

  @media screen and (max-width: 640px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

const SectionContent = styled.div`
  position: relative;
`;

const SectionList = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px 12px;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 16px;
  }
`;

const SectionItem = styled.li`
  opacity: .75;
  cursor: pointer;
  transition: opacity .3s ease;

  &:hover {
    opacity: 1;
  }
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

  @media screen and (max-width: 640px) {
    font-size: 15px;
    line-height: 20px;
  }
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

const ButtonLoadMore = styled.button`
  width: 100%;
  margin-top: 40px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #999;
  text-align: center;
  font-size: 17px;
  color: #ccc;
`;

interface ISearchSection {
  data: IResults[] | undefined;
  title?: any;
  media: string;
  keyword: string;
};

function SearchSection({ data, title, media, keyword }: ISearchSection) {
  const loadCount = 12;
  const [ listIndex, setListIndex ] = useState(1);
  const loadMore = () => setListIndex((prev) => prev + 1);

  //for modal
  const history = useHistory();
  const openModal = (id: number) => {
    history.push(`/search/${media}/${id}?keyword=${keyword}`)
  };
  const modalMatch = useRouteMatch<{id: string}>(`/search/${media}/:id`);
  const clickedId = modalMatch?.params.id;

  return (
    <>
      <SectionWrap>
        <SectionTitle>
          <span>{title}</span>
          <em>({data?.length})</em>
        </SectionTitle>
        <SectionContent>
          <SectionList>
            {data &&
              data
              .slice(0, loadCount * listIndex)
              .map((item: IResults) => (
                <SectionItem
                  key={item.id}
                  onClick={() => openModal(item.id)}
                >
                  <ItemImage
                    $bgImage={item.poster_path && makeImagePath(item.poster_path)}
                    layoutId={`${media}${item.id}`}
                  >
                  </ItemImage>
                  <ItemInfo>
                    <Title>{item.name ? item.name : item.title}</Title>
                    <Overview>{item.overview}</Overview>
                  </ItemInfo>
                </SectionItem>
            ))}
          </SectionList>
          {data?.length && listIndex < (data?.length / loadCount) ? (
            <ButtonLoadMore onClick={loadMore}>Load More</ButtonLoadMore>
          ) : null}
        </SectionContent>
      </SectionWrap>

      <AnimatePresence>
        {modalMatch ? (
          <Modal
            clickedId={clickedId}
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
