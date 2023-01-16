import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ImageContainer = styled.div`
  height: 7.5em;
  position: relative;
  overflow: hidden;
`;
const Image = styled.img`
  z-index: 1;
  position: absolute;
  top: -9999px;
  bottom: -9999px;
  left: -9999px;
  right: -9999px;
  margin: auto;
`;
const Logo = styled.img`
  z-index: 3;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5em;

  height: 4.5em;
`;

const NavContainer = styled.nav`
  z-index: 2;
  position: absolute;
  margin-top: 5.5em;

  height: 2em;
  width: 100%;

  color: white;
  background-color: rgba(48, 25, 52, 0.9);

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

const NavList = styled.ul`
  list-style: none;

  height: 100%;
  width: 100%;
  max-width: 50em;

  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const NavListItem = styled.li`
  a {
    text-decoration: none;
    color: white;
  }
  a:hover {
    color: #ce93d8;
  }
`;

function NavBar() {
  let activeStyle = {
    color: "#ce93d8",
    textDecoration: "underline",
  };

  return (
    <ImageContainer>
      <Image src="https://firebasestorage.googleapis.com/v0/b/team-ontheline.appspot.com/o/misc%2Fheader.png?alt=media&token=df3f4661-fe89-43f9-9a75-bdfc3c288913" />
      <Logo src="https://firebasestorage.googleapis.com/v0/b/team-ontheline.appspot.com/o/misc%2FOn-The-Line-logga-f%C3%A4rg-minus-2023.png?alt=media&token=612abe59-031d-421b-9804-8a1a152b9993" />
      <NavContainer>
        <NavList>
          <NavListItem>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Hem
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink
              to="/event"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Event
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink
              to="/media"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Media
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink
              to="/team"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Team
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink to="/kontakt">Kontakt</NavLink>
          </NavListItem>
        </NavList>
      </NavContainer>
    </ImageContainer>
  );
}

export default NavBar;
