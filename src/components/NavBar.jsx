import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ImageContainer = styled.div`
  height: 7em;
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

  height: 4em;
`;

const NavContainer = styled.nav`
  z-index: 2;
  float: left;
  position: absolute;
  margin-top: 5em;

  height: 2em;
  width: 100vw;

  color: white;
  background-color: rgba(48, 25, 52, 0.9);

  overflow: hidden;
`;

const NavList = styled.ul`
  list-style: none;

  height: 100%;
  width: 100%;
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
      <Image src="https://firebasestorage.googleapis.com/v0/b/team-ontheline.appspot.com/o/Screenshot_20230105_154928.jpg?alt=media&token=9238acbd-7c67-457a-a07a-6f5e163439e3" />
      <Logo src="https://firebasestorage.googleapis.com/v0/b/team-ontheline.appspot.com/o/Screenshot%20from%202023-01-05%2016-54-15.png?alt=media&token=d5c6117c-6a54-4214-bfcf-83cfcf9401a4" />
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
