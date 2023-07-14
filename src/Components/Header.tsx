import styled from "styled-components";

const HeaderWrap = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding: 16px 4px;
  align-items: center;

  @media screen and (max-width: 1328px) {
    padding: 16px 28px;
  }
`;

const Logo = styled.div`
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.blue};
`;

const LinkWrap = styled.div`
  display: flex;
  margin-left: 30px;

  a {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-right: 20px;
    font-size: 15px;
  }

  i {
    display: inline-block;
    width: 16px;
    height: 2px;
    margin-top: 6px;
    border-radius: 2px;
    background-color: ${props => props.theme.blue};
  }
`;

const SearchWrap = styled.div`
  margin-left: auto;
`;

const SearchForm = styled.form`
  display: flex;

  input {
    border: none;
    border-bottom: 2px solid ${props => props.theme.white.lighter};
    background: none;
    font-size: 15px;

    &::placeholder {
      font-size: 13px;
      color: #a2a2a2;
    }
  }
`;

function Header() {

  return (
    <HeaderWrap>
      <Logo>
        Cetflix
      </Logo>
      <LinkWrap>
        <a>
          <span>TV Shows</span>
          <i></i>
        </a>
        <a>
          <span>Movies</span>
        </a>
      </LinkWrap>
      <SearchWrap>
        <SearchForm>
          <input type="text" placeholder="제목, 출연진, 장르 ..." />
          <button aria-label="검색">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 72 72"
              width="26px"
              height="26px"
              fill="white"
            >
              <path d="M 31 11 C 19.973 11 11 19.973 11 31 C 11 42.027 19.973 51 31 51 C 34.974166 51 38.672385 49.821569 41.789062 47.814453 L 54.726562 60.751953 C 56.390563 62.415953 59.088953 62.415953 60.751953 60.751953 C 62.415953 59.087953 62.415953 56.390563 60.751953 54.726562 L 47.814453 41.789062 C 49.821569 38.672385 51 34.974166 51 31 C 51 19.973 42.027 11 31 11 z M 31 19 C 37.616 19 43 24.384 43 31 C 43 37.616 37.616 43 31 43 C 24.384 43 19 37.616 19 31 C 19 24.384 24.384 19 31 19 z"/>
            </svg>
          </button>
        </SearchForm>
      </SearchWrap>
    </HeaderWrap>
  );
}

export default Header;
