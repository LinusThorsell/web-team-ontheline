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

function DivisionBox({ div, players, roundsToCount, keyProp }) {
  players = players.entries;
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
              <td>{p.user.firstname} {p.user.lastname}</td>
              <td>{p.total_score}</td>
              {p.scores.map((point, index) =>
                <td key={keyProp + 'pointres' + p.name + index}>{point.score}</td>
              )}
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

function Result({ result }) {
  if (result.tour) {
    return (
      <ResultContainer>
        <h1 style={{ marginBottom: 0 }}>{result.tour.title}</h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {
            Object.keys(result.divisions).map((key) =>
              <DivisionBox key={key + result.tour.event_url} keyProp={key + result.tour.event_url} div={key} players={result.divisions[key]} roundsToCount={result.tour.score_count} />
            )
          }
        </div>
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
