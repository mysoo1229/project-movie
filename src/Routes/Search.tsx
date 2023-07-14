import starGray from "../resources/star-gray.png";
import starYellow from "../resources/star-yellow.png";
import styled from "styled-components";

const ResultList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 60px 20px;
`;

const ItemImage = styled.div`
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const ItemInfo = styled.div`
  padding: 8px 4px;
`;

const Title = styled.h3`
  width: 100%;
  font-size: 17px;
  line-height: 25px;
  font-weight: bold;
`;

const Rating = styled.div`
  margin: 10px 0 8px;

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

const Genre = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  color: #999;
`;

const NoResult = styled.div`
  display: none;
  padding-top: 50px;
  text-align: center;
  font-size: 17px;
`;

function Search() {
  return (
    <>
      <ResultList>
        {["1", "2", "3", "4", "5", "6", "7"].map((item) => (
          <li key={item}>
            <ItemImage>
              <img src="https://m.media-amazon.com/images/M/MV5BZjYxYWVjMDMtZGRjZS00ZDE4LTk0OWUtMjUyOTI4MmYxNjgwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SL1024_.jpg" alt="" />
            </ItemImage>
            <ItemInfo>
              <Title>Elemental</Title>
              <Rating>
                <i>
                  <strong style={{width: '70%'}}></strong>
                </i>
                <span>(3.5)</span>
              </Rating>
              <Genre>like what, djksd, allsd, we, aslef, asdfef, asef sdl, dfsd</Genre>
            </ItemInfo>
          </li>
        ))}
      </ResultList>

      <NoResult>Sorry, there is nothing that matches your search.</NoResult>
    </>
  );
}

export default Search;
