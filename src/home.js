import styled from 'styled-components'
import logojpg from './logo.jpg'
import logowebp from './logo.webp'
import mapjpg from './map.jpg'
import mapwebp from './map.webp'
import { Link } from 'react-router-dom'

const AppContainer = styled.div`
  overflow: hidden;
`
const Headbar = styled.div`
  height: 20vh;
  width: 100%;
  border-bottom: solid 0.5vh #E6332A;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Picture = styled.picture`
  height: 100%;
  width: auto;
`
const Logo = styled.img`
  height: 100%;
  width: auto;
`
const Map = styled.img`
  height: auto;
  width: 100%;
  max-width: 50em;
  margin: 0;
  padding: 0;
`
const NETitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 1.5em;
`
const NextEvent = styled.div`
  height: fit-content;
  margin: 0;
  padding: 0.5vh 0vh 1.5vh 0vh;

  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 0.5vh #E6332A;
  border-bottom: solid 0.5vh #E6332A;
`
const NEventContainer = styled.div`
  text-align: center;
`
const NavigationDiv = styled.div`
  height: fit-content;
  width: fit-content;
  padding: 2vh;
  border: 0.5vh solid #E6332A;
  margin-right: 0.5vh;
  font-size: 1em;
`
const HeaderButtonDiv = styled.div`
  display: flex;
  text-align: center;
`

const CenterNewsContainer = styled.div`
  display: flex;
  justify-content: center;
`
const NewsContainer = styled.div`
  width: 100%;
  max-width: 40em;
  height: fit-content;
  padding: 0.5em;
  border-bottom: 0.1em solid black;
`
const NewsTitle = styled.h1`
  font-size: 1.5em;
  text-decoration: underline;
  margin: 0;
`
const NewsText = styled.p`
  font-size: 1em;
  margin: 0;
`
const NewsImage = styled.img`
  width: auto;
  height: 100%;
  float: left;
`
const NewsImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 10em;
  margin-bottom: 1em;
`

const Footer = styled.div`
  height: 2.5em;
  border-top: 0.5vh solid #E6332A;
  font-size: 1em;
  text-align: center;
`

function Home() {
  return (
    <AppContainer>
      <Headbar>
        <Picture>
          <source type="image/webp" srcSet={logowebp}></source>
          <source type="image/jpeg" srcSet={logojpg}></source>
          <Logo src={logojpg} width="500" height="500" alt="Logo of the Team OnTheLine Tour." />
        </Picture>
        <HeaderButtonDiv>
        <Link to="/event">
          <NavigationDiv>
            Nuvarande Event
          </NavigationDiv>
        </Link>
        <Link to="/oldevents">
          <NavigationDiv>
            Gamla Event
          </NavigationDiv>
        </Link>
        </HeaderButtonDiv>
      </Headbar>
      <CenterNewsContainer>
        <Picture>
          <source type="image/webp" srcSet={mapwebp}></source>
          <source type="image/jpeg" srcSet={mapjpg}></source>
          <Map src={mapjpg} width="1500" height="1008" alt="Map of the Team OnTheLine Tour 2022." />
        </Picture>
      </CenterNewsContainer>
      <NextEvent>
        <NEventContainer>
          <NETitle>Nästa Event: Gravel Pit 7/5<br></br>Registrering Öppnar: 23/4 18:00 <br></br><a href="https://tjing.se/event/dfd60128-4ac9-41e5-b066-05bec01d28cb/results">Registrera dig på Tjing.se</a></NETitle>
        </NEventContainer>
      </NextEvent>
      <CenterNewsContainer>
      <div>
      <NewsContainer>
          <NETitle>26/1</NETitle>
          <NewsTitle>Sponsordags!</NewsTitle>
          <NewsText>
            Hej discgolfare!<br></br>
            Idag slog vi igenom en sponsordeal med MVP Disc Sports. <br></br><br></br>
            <NewsImageContainer>
            <NewsImage src="https://mvpdiscsports.com/wp-content/uploads/2020/05/MVPOrbitLogo_Black.png" />
            </NewsImageContainer>
            Detta betyder att vi kommer ha många roliga priser och kanske till och med lite giveaways av större produkter. <br></br><br></br>
            Vi har också uppdaterat våran facebooksida och Tjing.se med alla våra event med aktuell information! <br></br><br></br>
            Vi ses i sommar! Ha en fin offseason!<br></br><br></br>
            Linus & Vincent<br></br>
            TD & Assisterande TD för OnTheLine Tour
          </NewsText>
        </NewsContainer>
        <NewsContainer>
          <NETitle>24/1</NETitle>
          <NewsTitle>Datum & Hemsida färdiga!</NewsTitle>
          <NewsText>
            Hej discgolfare!<br></br>
            Idag blev de sista datumen färdigställda med banklubbarna så nu kan vi släppa hela schemat för 2022 års tour! <br></br><br></br>
            Jag (Linus) & Vincent är mycket taggade på att träffa er på första deltävlingen på Gravel Pit DiscGolfPark den 7/5! <br></br><br></br>
            Om det kommer några frågor kan ni fritt fram kontakta sidan's messenger på facebook via länken: <a href="https://www.facebook.com/teamontheline">Team OnTheLine</a> eller på Mail till thorsell.linus@gmail.com <br></br><br></br>
            Vi ser fram emot att träffas! Hörs & Ses på Gravel Pit!<br></br><br></br>
            Linus & Vincent<br></br>
            TD & Assisterande TD för OnTheLine Tour
          </NewsText>
        </NewsContainer>
        </div>
      </CenterNewsContainer>
      <Footer>
        Kontakta oss via Messenger: <a href="https://www.facebook.com/teamontheline">Team OnTheLine</a> eller på Mail: thorsell.linus@gmail.com
      </Footer>
    </AppContainer>
  );
}

export default Home;
