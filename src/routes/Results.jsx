import { useEffect, useState } from "react";
import styled from "styled-components";
import { getEventResults } from "../firebase";

import { convertCSVToArrayOfObjects } from "convert-csv-to-array/lib/modules/convert-csv-to-array-of-objects";

const ResultContainer = styled.div`
  margin: auto;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  width: 95%;
`;

function groupObjectsByProperty(array, property) {
  const groupedObjects = {};

  // Group objects by the selected property
  for (const object of array) {
    const value = object[property];

    if (value in groupedObjects) {
      groupedObjects[value].push(object);
    } else {
      groupedObjects[value] = [object];
    }
  }

  // Convert grouped objects into a nested array
  const nestedArray = Object.values(groupedObjects);

  // Update the original array with the nested array
  array.length = 0;
  Array.prototype.push.apply(array, nestedArray);
}

function removeIrrelevantFields(arr) {
  let res = []
  arr.forEach(player => {
    res.push({
      'div': player['DivCode'],
      'name': player['First name'].replace(/\s/g, '') + ' ' + player['Last name'].replace(/\s/g, ''),
      'score': player['Total\r'],
      'points': []
    })
  });

  return res
}

function score(arr) {
  arr.sort((a, b) => a.score - b.score)

  groupObjectsByProperty(arr, 'score')
  let currentPoints = 100
  arr.forEach((scoreGroup) => {
    scoreGroup.forEach((player) => {
      player.points = currentPoints
      player.total = 0
    })

    currentPoints -= scoreGroup.length
  })
  arr = arr.flat()

  return arr
}

function getDiv(divStr, arr) {
  let matches = []
  arr.forEach((player) => {
    if (player.div === divStr) {
      matches.push(player)
    }
  })
  return matches
}

async function getMappedPlayers() {
  return getEventResults().then((res) => {
    let eventArrs = []
    res.forEach((event) => {
      let arr = convertCSVToArrayOfObjects(event, { header: false, separator: "," })
      arr = removeIrrelevantFields(arr)
      console.log(arr)
      arr = score(arr)
      console.log(arr)

      eventArrs.push(arr)
    })

    eventArrs = eventArrs.flat()
    console.log(eventArrs)
    groupObjectsByProperty(eventArrs, 'name')

    eventArrs.forEach((player, index) => {
      let playerObj = player[player.length - 1]
      let total = 0
      let points = []
      player.forEach((pObj) => {
        points.push(pObj.points)
      })
      points.sort((a, b) => b - a)
      points = points.slice(0, 6)
      total = points.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      playerObj.points = points
      playerObj.total = total

      eventArrs[index] = playerObj
    })

    let sortedPlayers = eventArrs.sort((a, b) => b.total - a.total)

    const divisions = [...new Set(sortedPlayers.map(obj => obj['div']))];

    let tempMap = new Map()
    divisions.forEach((division) => {
      tempMap.set(division, getDiv(division, sortedPlayers))
    })
    console.log(sortedPlayers)

    return tempMap
  })
}

function DivisionBox({ div, players }) {
  players = Array.from(players)
  return (
    <div style={{ textAlign: "center", margin: "0.5em" }}>
      <h1>{div}</h1>
      <table>
        <thead>
          <tr>
            <th>Plats</th>
            <th>Namn</th>
            <th>Best 6</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
          </tr>
        </thead>
        <tbody>
          {
            players.map((p, i) => <tr>
              <td>{i+1}</td>
              <td>{p.name}</td>
              <td>{p.total}</td>
              {p.points.map((point) =>
                <td>{point}</td>
              )}
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

function Contact() {
  const [mappedPlayers, setMappedPlayers] = useState(new Map())

  useEffect(() => {
    getMappedPlayers().then((res) => setMappedPlayers(res))
  }, [])

  console.log(mappedPlayers)

  return (
    <ResultContainer>
      <p style={{width: "90%", border: "thin solid white"}}>Hej Discgolfare!<br></br> Notera att denna sidan är ny! Skicka mail till kontakta@teamontheline.com om du hittar något fel på sidan!<br></br>Mvh Linus</p>
      <h1 style={{ marginBottom: 0 }}>Totalen OnTheLine 2023</h1>
      <p style={{ margin: 0 }}>Sponsrat av MVP Disc Sports och RocketDiscs.com</p>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {
          [...mappedPlayers.keys()].map((key) =>
            <DivisionBox key={key + "OTL2023"} div={key} players={mappedPlayers.get(key)} />
          )
        }
      </div>

      {/* <h1 style={{ marginBottom: 0 }}>Resultat MVP Space Race 2022</h1>
      <p style={{ margin: 0 }}>Presenteras av MVP Disc Sports. Sponsrat av RocketDiscs.com</p>
      <h1 style={{ marginBottom: 0 }}>Totalen OnTheLine 2022</h1>
      <p style={{ margin: 0 }}>Sponsrat av MVP Disc Sports.</p> */}
    </ResultContainer>
  );
}

export default Contact;
