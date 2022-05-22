import { Component } from 'react'
import styled from 'styled-components'
import logojpg from './logo.jpg'
import logowebp from './logo.webp'
import { Link } from 'react-router-dom'

// data files for event results
import { get2022_1 } from './results/2022_1.js';

const AppContainer = styled.div`
  overflow: hidden;
`
const Logo = styled.img`
  height: 10em;
  width: auto;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const Table = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
  margin: 0.5em;
`
const Tr = styled.tr`
  border: 1px solid black;
  padding: 0.5em;
`
const Th = styled.th`
  border: 1px solid black;
  padding: 0.5em;
  font-size: 0.8em;
`
const Td = styled.td`
  border: 1px solid black;
  padding: 0.5em;
`

const H3 = styled.h3`
  margin-left: 0.5em;
  margin-bottom: 0;
`

const NavigationDiv = styled.div`
  height: fit-content;
  width: fit-content;
  padding: 2vh;
  border: 0.5vh solid #E6332A;
  margin-right: 0.5vh;
  font-size: 1em;
`

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`


class Event extends Component {
  render()
  {
  let Events = [
    {
      course_name: "Gravel Pit",
      date: "7/5",
      tjing_event: "https://tjing.se/event/dfd60128-4ac9-41e5-b066-05bec01d28cb/details"
    },
    {
      course_name: "Tallbackens DGB, Brevens Bruk",
      date: "21/5",
      tjing_event: "https://tjing.se/event/4c91ced7-39d4-4e77-a04e-f7479041e69a/details"
    },
    {
      course_name: "Häfla Bruks DiscGolfPark",
      date: "4/6",
      tjing_event: "https://tjing.se/event/934ffa2d-2f67-4f93-982f-7dd8e60fbe47/details"
    },
    {
      course_name: "Disc Golf Arena Grosvad",
      date: "18/6",
      tjing_event: "https://tjing.se/event/0cec5152-0bc1-4eaf-8f4f-269c57e54b17/details"
    },
    {
      course_name: "Fålehagen DiscGolfPark",
      date: "2/7",
      tjing_event: "https://tjing.se/event/600bd09a-7177-43cb-b26c-a3990a7a5f56/details"
    },
    {
      course_name: "Rydskogens DiscGolfCenter",
      date: "16/7",
      tjing_event: "https://tjing.se/event/f0d6295a-d352-4bfa-80d2-9eb66954cfe6/details"
    },
  ]
  
  let MPOTotalen = [
    {
      name: "Ej spelad/rapporterad ännu.",
      points_1: 0,
      points_2: 0,
      points_3: 0,
      points_4: 0,
      points_5: 0,
      points_6: 0,
      best_3: 0,
      extra_points: 0,
    },
  ]
  let FPOTotalen = [
    {
      name: "Ej spelad/rapporterad ännu.",
      points_1: 0,
      points_2: 0,
      points_3: 0,
      points_4: 0,
      points_5: 0,
      points_6: 0,
      best_3: 0,
      extra_points: 0,
    },
  ]
  let RecreationalTotalen = [
    {
      name: "Ej spelad/rapporterad ännu.",
      points_1: 0,
      points_2: 0,
      points_3: 0,
      points_4: 0,
      points_5: 0,
      points_6: 0,
      best_3: 0,
      extra_points: 0,
    },
  ]
  let NoviceTotalen = [
    {
      name: "Ej spelad/rapporterad ännu.",
      points_1: 0,
      points_2: 0,
      points_3: 0,
      points_4: 0,
      points_5: 0,
      points_6: 0,
      best_3: 0,
      extra_points: 0,
    },
  ]

  function insertData(string_data)
  {
    console.log(string_data);
  }

  insertData(get2022_1());

  return (
    <AppContainer>
      <TopContainer>
      <Link to="/">
        <picture>
          <source type="image/webp" srcSet={logowebp}></source>
          <source type="image/jpeg" srcSet={logojpg}></source>
          <Logo src={logojpg}  width="500" height="500" alt="Logo of the Team OnTheLine Tour." />
        </picture>
      </Link>
      <Link to="/">
          <NavigationDiv>
            Gå Tillbaka
          </NavigationDiv>
        </Link>
      </TopContainer>
      <Table>
      <thead>
      <Tr>
          <Th>Datum</Th>
          <Th>Bana</Th>
          <Th>Registreringslänk (Tjing.se)</Th>
      </Tr>
      </thead>
      <tbody>
      {Events.map(data => (
        <Tr key={data.date}>
          <Td>{data.date}</Td>
          <Td>{data.course_name}</Td>
          <Td><a href={data.tjing_event}>Länk</a></Td>
        </Tr>
      ))}
      </tbody>

      </Table>
      
      <Container>
        
      <div>
      <H3>MPO</H3>
      <Table>
      <thead>
      <Tr key="MPOTableHeader">
          <Th>Namn</Th>
          <Th>Gravel Pit</Th>
          <Th>Tallbackens DGB</Th>
          <Th>Häfla Bruk DGP</Th>
          <Th>Arena Grosvad DG</Th>
          <Th>Fålehagen DGP</Th>
          <Th>Rydskogen DGC</Th>
          <Th>CTP / Extra</Th>
      </Tr>
      </thead>
      <tbody>
      {MPOTotalen.map(data => (
        <Tr key={data.name}>
          <Td>{data.name}</Td>
          <Td>{data.points_1}</Td>
          <Td>{data.points_2}</Td>
          <Td>{data.points_3}</Td>
          <Td>{data.points_4}</Td>
          <Td>{data.points_5}</Td>
          <Td>{data.points_6}</Td>
          <Td>{data.extra_points}</Td>
        </Tr>
      ))}
      </tbody>
      </Table>
      </div>

      <div>
      <H3>FPO</H3>
      <Table>
      <thead>
      <Tr>
          <Th>Namn</Th>
          <Th>Gravel Pit</Th>
          <Th>Tallbackens DGB</Th>
          <Th>Häfla Bruk DGP</Th>
          <Th>Arena Grosvad DG</Th>
          <Th>Fålehagen DGP</Th>
          <Th>Rydskogen DGC</Th>
          <Th>CTP / Extra</Th>
      </Tr>
      </thead>
      <tbody>
      {FPOTotalen.map(data => (
        <Tr key={data.name}>
          <Td>{data.name}</Td>
          <Td>{data.points_1}</Td>
          <Td>{data.points_2}</Td>
          <Td>{data.points_3}</Td>
          <Td>{data.points_4}</Td>
          <Td>{data.points_5}</Td>
          <Td>{data.points_6}</Td>
          <Td>{data.extra_points}</Td>
        </Tr>
      ))}
      </tbody>
      </Table>
      </div>

      <div>
      <H3>Recreational</H3>
      <Table>
      <thead>
      <Tr>
          <Th>Namn</Th>
          <Th>Gravel Pit</Th>
          <Th>Tallbackens DGB</Th>
          <Th>Häfla Bruk DGP</Th>
          <Th>Arena Grosvad DG</Th>
          <Th>Fålehagen DGP</Th>
          <Th>Rydskogen DGC</Th>
          <Th>CTP / Extra</Th>
      </Tr>
      </thead>
      <tbody>
      {RecreationalTotalen.map(data => (
        <Tr key={data.name}>
          <Td>{data.name}</Td>
          <Td>{data.points_1}</Td>
          <Td>{data.points_2}</Td>
          <Td>{data.points_3}</Td>
          <Td>{data.points_4}</Td>
          <Td>{data.points_5}</Td>
          <Td>{data.points_6}</Td>
          <Td>{data.extra_points}</Td>
        </Tr>
      ))}
      </tbody>
      </Table>
      </div>

      <div>
      <H3>Novice</H3>
      <Table>
      <thead>
      <Tr>
          <Th>Namn</Th>
          <Th>Gravel Pit</Th>
          <Th>Tallbackens DGB</Th>
          <Th>Häfla Bruk DGP</Th>
          <Th>Arena Grosvad DG</Th>
          <Th>Fålehagen DGP</Th>
          <Th>Rydskogen DGC</Th>
          <Th>CTP / Extra</Th>
      </Tr>
      </thead>
      <tbody>
      {NoviceTotalen.map(data => (
        <Tr key={data.name}>
          <Td>{data.name}</Td>
          <Td>{data.points_1}</Td>
          <Td>{data.points_2}</Td>
          <Td>{data.points_3}</Td>
          <Td>{data.points_4}</Td>
          <Td>{data.points_5}</Td>
          <Td>{data.points_6}</Td>
          <Td>{data.extra_points}</Td>
        </Tr>
      ))}
      </tbody>
      </Table>
      </div>

      </Container>
    </AppContainer>
  );
}
}

export default Event;
