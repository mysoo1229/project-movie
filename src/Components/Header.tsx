import { motion, useAnimation, useMotionValueEvent, useScroll } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router";
import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";

const HeaderFix = styled(motion.div)`
  z-index: 98;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

const HeaderWrap = styled.header`
  display: flex;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 4px;
  align-items: center;

  @media screen and (max-width: 1420px) {
    padding: 16px 34px;
  }

  @media screen and (max-width: 1024px) {
    max-width: 800px;
  }
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.theme.blue};
`;

const LinkWrap = styled.nav<{$isSearchOpen: boolean}>`
  display: flex;
  margin-left: 30px;

  a {
    position: relative;
    align-items: center;
    flex-direction: column;
    margin-right: 20px;
    font-size: 15px;
  }

  span {
    display: block;
    padding-bottom: 2px;
  }

  @media screen and (max-width: 1024px) {
    display: ${(props) => props.$isSearchOpen ? "none" : "flex"};
  }
`;

const LinkActive = styled(motion.i)`
  display: block;
  position: absolute;
  right: 0;
  bottom: -4px;
  left: 0;
  width: 16px;
  height: 2px;
  margin: 0 auto;
  border-radius: 2px;
  background-color: ${props => props.theme.blue};
`;

const SearchWrap = styled.form`
  position: relative;
  margin-left: auto;
`;

const SearchButton = styled(motion.button)`
  width: 30px;
  height: 30px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const SearchInput = styled(motion.input)`
  position: absolute;
  right: 4px;
  width: 180px;
  padding: 2px 6px 4px;
  border: none;
  border-bottom: 1px solid ${props => props.theme.white.lighter};
  background: none;
  transform-origin: right center;
  font-size: 15px;
  line-height: 22px;

  &::placeholder {
    font-size: 13px;
    line-height: 22px;
    color: #999;
  }
`;

const navVariants = {
  top: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  scroll: { backgroundColor: 'rgba(0, 0, 0, 1)' },
};

interface ISearch {
  keyword: string;
};

function Header() {
  const movieMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (currentY) => {
    if (currentY > 30) {
      navAnimation.start("scroll")
    } else {
      navAnimation.start("top")
    }
  });

  //for Search
  const [searchOpen, setSearchOpen] = useState(false);
  const history = useHistory();
  const { register, handleSubmit, setValue, setFocus } = useForm<ISearch>();
  const clickSearch = () => {
    setSearchOpen((prev) => !prev);
    setFocus("keyword");
  };
  const onValid = (data: ISearch) => {
    history.push(`/search?keyword=${data.keyword}`);
  };

  return (
    <HeaderFix
      variants={navVariants}
      animate={navAnimation}
    >
      <HeaderWrap>
        <Logo>
          Cetflix
        </Logo>
        <LinkWrap>
        <LinkWrap $isSearchOpen={searchOpen}>
          <Link to="/">
            <span>Movies</span>
            {movieMatch?.isExact && <LinkActive layoutId="linkActive" />}
          </Link>
          <Link to="/tv">
            <span>TV Shows</span>
            {tvMatch && <LinkActive layoutId="linkActive" />}
          </Link>
        </LinkWrap>
        <SearchWrap onSubmit={handleSubmit(onValid)}>
          <SearchButton
            type="button"
            aria-label="Open Search"
            onClick={clickSearch}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: 'linear', duration: .2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" fill="white"></path>
            </svg>
          </SearchButton>
          <SearchInput
            {...register("keyword", {
              required: true,
              minLength: 2,
            })}
            type="text"
            placeholder="Title, People, Genre ..."
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ type: 'linear', duration: .2 }}
          />
        </SearchWrap>
      </HeaderWrap>
    </HeaderFix>
  );
}

export default Header;
