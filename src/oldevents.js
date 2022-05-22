import { Component } from 'react'
import styled from 'styled-components'
import logojpg from './logo.jpg'
import logowebp from './logo.webp'
import { Link } from 'react-router-dom'

const AppContainer = styled.div`
  overflow: hidden;
  text-align: center;
`
const Logo = styled.img`
  height: 10em;
  width: auto;
`
const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const NavigationDiv = styled.div`
  height: fit-content;
  width: fit-content;
  padding: 2vh;
  border: 0.5vh solid #E6332A;
  margin-right: 0.5vh;
  font-size: 1em;
`


class OldEvents extends Component {
  render()
  {

  return (
    <AppContainer>
      <TopContainer>
      <Link to="/">
        <picture>
          <source type="image/webp" srcset={logowebp}></source>
          <source type="image/jpeg" srcset={logojpg}></source>
          <Logo src={logojpg} width="500" height="500" alt="Logo of the Team OnTheLine Tour." />
        </picture>
      </Link>
      <Link to="/">
          <NavigationDiv>
            Gå Tillbaka
          </NavigationDiv>
      </Link>
      </TopContainer>
      När vi har kör fler event kommer dessa arkiveras här. <br></br>
      Tagga OnTheLine Tour 2022!
    </AppContainer>
  );
}
}

export default OldEvents;
