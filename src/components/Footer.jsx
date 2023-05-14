import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.div`
  margin: 0;
  padding: 0;

  margin-top: auto;

  color: white;
  background-image: linear-gradient(#301934, black);

  overflow: hidden;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (min-width: 40em) {
    justify-content: center;
  }
`;

const ListContainer = styled.ul`
  list-style: none;
`;

function Footer() {
  return (
    <FooterContainer>
      <ListContainer>
        <h3>Om oss</h3>
        <li>OffTheLine AB</li>
        <li>Org Nr: 559427-4101</li>
        <li>----------------------</li>
        <li>Linus Thorsell</li>
        <li>Vincent Müller</li>
        <li>Robert Sjöblom</li>
        <li>Oscar Lövborg</li>
      </ListContainer>
      <ListContainer>
        <h3>Sociala Medier</h3>
        <li>
          <a style={{color: 'white'}} href="https://www.instagram.com/team_ontheline/" target="_blank">
            Instagram
          </a>
        </li>
        <li>
          <a style={{color: 'white'}} href="https://www.facebook.com/teamontheline" target="_blank">
            Facebook
          </a>
        </li>
      </ListContainer>
      <ListContainer>
        <h3>Kontakt</h3>
        <li>kontakta@teamontheline.com</li>
        <li>sponsors@teamontheline.com</li>
        <li>admin@teamontheline.com</li>
        <Link to="/admin"> Admin </Link>
      </ListContainer>
    </FooterContainer>
  );
}

export default Footer;
