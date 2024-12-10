import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  // Debounced search API call
  const debounceRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Perform search after debounce
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]); // Clear results if query is empty
      return;
    }

    // Debounce logic
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setIsSearching(true);
      fetch(`https://backend-java-latest.onrender.com/search?query=${searchQuery}`)
        .then((response) => response.json()) // Parse response as JSON
        .then((data) => {
          setSearchResults(data);
          setIsSearching(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setIsSearching(false);
        });
    }, 500); // 500ms debounce
  }, [searchQuery]); // Runs every time searchQuery changes

  // Close search results on Escape key press or click outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchResults([]);
      }
    };

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.png" alt="CinemaFlex" />
      </Logo>
      <NavMenu>
        <a href="/home">
          <img src="/images/home-icon.svg" alt="HOME" />
          <span>HOME</span>
        </a>
        <Search ref={searchRef}>
          <SearchInput
            type="text"
            placeholder="Search for movies, shows..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && !isSearching && searchResults.length > 0 && (
            <SearchResults>
              {searchResults.map((movie) => (
                <Link to={`/detail/${movie.id}`} key={movie.id} className="result-item">
                  <img src={movie.card_img} alt={movie.title} />
                  <span>{movie.title}</span>
                </Link>
              ))}
            </SearchResults>
          )}
          {isSearching && <Loader></Loader>}
        </Search>
        <a href="#originals">
          <img src="/images/original-icon.svg" alt="ORIGINALS" />
          <span>ORIGINALS</span>
        </a>
        <a href="#trending">
          <img src="/images/movie-icon.svg" alt="TRENDING" />
          <span>TRENDING</span>
        </a>
        <a href="#series">
          <img src="/images/series-icon.svg" alt="SERIES" />
          <span>SERIES</span>
        </a>
      </NavMenu>
      <Login>
        <a href="/signin">Log Out</a>
      </Login>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  border-color: transparent;

  &:hover {
    color: black;
    border: 1px solid #f9f9f9;
  }
`;

const Search = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #090b13;
  color: rgb(249, 249, 249);
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 14px;
  box-sizing: border-box;
  
  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #f9f9f9;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  background-color: #333;
  color: white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;

  .result-item {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    
    img {
      width: 50px;
      height: 75px;
    }

    span {
      font-weight: bold;
    }

    &:hover {
      background-color: #444;
    }
  }
`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 16px;
  text-align: center;
`;

export default Header;
