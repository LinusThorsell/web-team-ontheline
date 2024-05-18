import { useEffect, useState } from "react";
import styled from "styled-components";
import { getEventResults } from "../firebase";

import { convertCSVToArrayOfObjects } from "convert-csv-to-array/lib/modules/convert-csv-to-array-of-objects";

const ResultContainer = styled.div`
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  width: 100vw;
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

async function getMappedPlayers(url, roundsToCount) {
  return getEventResults(url).then((res) => {
    let eventArrs = []
    res.forEach((event) => {
      let arr = convertCSVToArrayOfObjects(event, { header: false, separator: "," })
      arr = removeIrrelevantFields(arr)
      arr = score(arr)

      eventArrs.push(arr)
    })

    eventArrs = eventArrs.flat()
    groupObjectsByProperty(eventArrs, 'name')

    eventArrs.forEach((player, index) => {
      let playerObj = player[player.length - 1]
      let total = 0
      let points = []
      player.forEach((pObj) => {
        points.push(pObj.points)
      })
      points.sort((a, b) => b - a)
      points = points.slice(0, roundsToCount)
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

    return tempMap
  })
}

function DivisionBox({ div, players, roundsToCount, keyProp }) {
  players = Array.from(players)
  const rounds = Array.from({ length: roundsToCount }, (_, index) => index + 1);
  return (
    <div style={{ textAlign: "center", padding: "0.5em", fontSize: window.innerWidth < 370 ? '0.8em' : '1em' }}>
      <h1>{div}</h1>
      <table>
        <thead>
          <tr>
            <th>Plats</th>
            <th>Namn</th>
            <th>Best {roundsToCount}</th>
            {rounds.map((round) =>
              <th key={keyProp + 'header' + round}>{round}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {
            players.map((p, i) => <tr key={keyProp + 'player' + p + i}>
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>{p.total}</td>
              {p.points.map((point, index) =>
                <td key={keyProp + 'pointres' + p.name + index}>{point}</td>
              )}
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

function Result(props) {
  const [loaded, setLoaded] = useState(false);
  const [mappedPlayers, setMappedPlayers] = useState(new Map())

  useEffect(() => {
    getMappedPlayers(props.eventUrl, props.roundsToCount).then((res) => { setLoaded(true); setMappedPlayers(res) })
  }, [])

  if (loaded && mappedPlayers.size > 0) {
    return (
      <ResultContainer>
        <h1 style={{ marginBottom: 0 }}>{props.title}</h1>
        <p style={{ margin: 0 }}>{props.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {
            [...mappedPlayers.keys()].map((key) =>
              <DivisionBox key={key + props.eventUrl} keyProp={key + props.eventUrl} div={key} players={mappedPlayers.get(key)} roundsToCount={props.roundsToCount} />
            )
          }
        </div>
      </ResultContainer>
    );
  }
  else if (loaded) {
    return (
      <ResultContainer>
        <h1 style={{ marginBottom: 0 }}>{props.title}</h1>
        <p style={{ margin: 0 }}>{props.description}</p>
        <h3>Inga resultat är tillgängliga ännu</h3>
      </ResultContainer>
    );
  }
  else {
    return (
      <ResultContainer>
        <h1>Laddar...</h1>
      </ResultContainer>
    )
  }
}

export default Result;
