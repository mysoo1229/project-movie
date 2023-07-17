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

const LogoSvg = styled(motion.svg)`
  width: 84px;
  height: 24px;
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

  &:focus {
    outline: none;
    border-bottom-color: ${props => props.theme.blue}
  }
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [.3, 1, .3],
    transition: {
      repeat: Infinity,
    }
  },
}

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
    setValue("keyword", "");
  };

  return (
    <HeaderFix
      variants={navVariants}
      animate={navAnimation}
    >
      <HeaderWrap>
        <Link to="/" aria-label="Cetflix">
          <LogoSvg
            variants={logoVariants}
            initial="normal"
            whileHover="active"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 198.13 56.32"
          >
            <path d="M24,12.77A13.55,13.55,0,0,0,10.3,26.61,13.61,13.61,0,0,0,24,40.51a17.39,17.39,0,0,0,11.72-5.28l6,6.51a26.37,26.37,0,0,1-18.21,8c-13.46,0-23.63-10-23.63-23S10.24,4,23.88,4a25.66,25.66,0,0,1,17.77,7.47l-5.92,7.21C32.64,15.09,28.2,12.77,24,12.77Z" transform="translate(0.13 0.1)" fill="#4692ff"/>
            <path d="M70.16,37.49l5.67,5.15a19.62,19.62,0,0,1-15.58,7.08c-11,0-18.41-7.08-18.41-17.64s6.89-17.64,17.77-17.7c10-.07,16.67,6,17.06,16l-24,6.31A8.65,8.65,0,0,0,61,42,12.3,12.3,0,0,0,70.16,37.49ZM51.75,30.73,67,26.61a6.59,6.59,0,0,0-6.83-4.89C55.23,21.72,52.08,24.87,51.75,30.73Z" transform="translate(0.13 0.1)" fill="#4692ff"/>
            <path d="M100,47.4a18.31,18.31,0,0,1-8.82,2.38c-6.37,0-11.07-4.05-11.07-11.46V6.72h9.85v9.52h9.46v6.89H89.93V36.65c0,3.28,1.35,4.76,3.54,4.76a9.48,9.48,0,0,0,4.44-1.28Z" transform="translate(0.13 0.1)" fill="#4692ff"/>
            <path d="M122.11,1.18c10,0,15.64,4.7,15.64,12.88V43.67c0,2.57,1.29,3.73,3.09,3.73a8.09,8.09,0,0,0,3.35-1l1,8.24a15.49,15.49,0,0,1-6.56,1.55c-5.79,0-10.69-3.86-10.69-11.91V14.44c0-3.28-2.19-5.08-6.3-5.15-3.8-.06-5.86,1.48-5.86,4.25v3.74h6.69v6.88h-6.69V49.33h-9.85V24.16h-4.64V17.28h4.64V12.83C105.89,5.37,111.75,1.12,122.11,1.18Z" transform="translate(0.13 0.1)" fill="#4692ff"/>
            <path d="M157.83,14.7V49.33h-9.91V14.7Zm-.12-9.85a4.83,4.83,0,1,1-9.66,0,4.83,4.83,0,1,1,9.66,0Z" transform="translate(0.13 0.1)" fill="#4692ff"/>
            <path d="M173.28,14.7l6.37,10.49,6.76-10.49h10.82l-11,16.87L198,49.33H186.61l-7-11.33-7.59,11.33H161.12l12-17.7L162,14.7Z" transform="translate(0.13 0.1)" fill="#4692ff"/>
          </LogoSvg>
        </Link>
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
