import starGray from "../resources/star-gray.png";
import starYellow from "../resources/star-yellow.png";
import styled from "styled-components";

const MainVisual = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  margin-bottom: 60px;
  border-radius: 16px;
  overflow: hidden;
  background-size: cover;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .75));
  }
`;

const VisualInner = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 65%;
  padding: 50px 30px;
`;

const VisualTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
`;

const VisualDescription = styled.div`
  display: -webkit-box;
  width: 100%;
  height: 66px;
  margin-top: 16px;
  overflow: hidden;
  word-break: break-all;
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
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionSlider = styled.div`
  position: relative;
`;

const SectionList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-top: 16px;
`;

const SectionItem = styled.li`
  overflow: hidden;
`;

const ItemImage = styled.div`
  position: relative;
  height: 0;
  padding-top: 120%;
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

const ButtonSlider = styled.button`
  position: absolute;
  top: 0;
  width: 50px;
  height: 100%;
  background: rgba(255, 255, 255, .1);
  border-radius: 12px;
  opacity: 0;
  transition: opacity .2s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    transform: rotate(45deg) translateY(-50%);
  }
`;

const ButtonPrev = styled(ButtonSlider)`
  left: -50px;

  &::after {
    left: 12px;
    border-bottom: 4px solid rgba(255, 255, 255, .9);
    border-left: 4px solid rgba(255, 255, 255, .9);
  }
`;

const ButtonNext = styled(ButtonSlider)`
  right: -50px;

  &::after {
    left: 4px;
    border-top: 4px solid rgba(255, 255, 255, .9);
    border-right: 4px solid rgba(255, 255, 255, .9);
  }
`;

const ModalWrap = styled.div`
  display: none;
  z-index: 99;
  position: fixed;
  top: 15vh;
  right: 0;
  left: 0;
  width: 600px;
  height: 70vh;
  margin: 0 auto;
  background: #222;
  border-radius: 16px;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, .2);
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


function Movies() {
  return (
    <>
      <MainVisual
        style={{backgroundImage: `url(${"https://assets.website-files.com/6024f92b17cc648cdd48d5de/6440ea081c857f6a97c00484_Elemental%20pixar%20animation%20in%20Cannes%20for%20MIME.jpg"})`}}
      >
        <VisualInner>
          <VisualTitle>Elemental</VisualTitle>
          <VisualDescription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde alias maiores excepturi error qui, pramet conse ctetur adipisicing elit ovident eos dolorem totam incidunt? Consequatur, iure. Odio doloribus ab debitis consectetur quae nobis pariatur fuga!</VisualDescription>
          <VisualButton>MORE INFO</VisualButton>
        </VisualInner>
      </MainVisual>

      <Section>
        <SectionTitle>Now Playing</SectionTitle>
        <SectionSlider>
          <SectionList>
            {["1", "2", "3", "4", "5"].map((item) => (
              <SectionItem key={item}>
                <ItemImage>
                  <img src="https://m.media-amazon.com/images/M/MV5BZjYxYWVjMDMtZGRjZS00ZDE4LTk0OWUtMjUyOTI4MmYxNjgwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SL1024_.jpg" alt="" />
                </ItemImage>
              </SectionItem>
            ))}
          </SectionList>
          <ButtonPrev></ButtonPrev>
          <ButtonNext></ButtonNext>
        </SectionSlider>
      </Section>

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
    </>
  );
}

export default Movies;
