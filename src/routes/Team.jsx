import {useState, useEffect} from 'react';
import styled from "styled-components";
import TDCard from "../components/TDCard";
import { getTeam } from "../firebase";

const TeamContainer = styled.div`
  margin: 0;
  padding: 0;

  background-color: #301934;

  h1 {
    margin-top: 0;
    padding-top: 1em;
    text-align: center;
    margin-bottom: 0;
  }
  h2 {
    margin-top: 0;
    text-align: center;
  }
  h3 {
    text-align: center;
    margin-bottom: 0.5em;
  }
  p {
    margin-top: 0;
    margin-bottom: 0;
    text-align: center;

    padding-left: 0.5em;
    padding-right: 0.5em;
    padding-bottom: 1.5em;
  }
`;

const TeamMemberContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;
`;

function Team() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    getTeam().then((data) => {
      setTeam(data);
    });
  }, []);

  return (
    <TeamContainer>
      <h1>Team OnTheLine 2023</h1>
      <p>Det är vi som kommer göra OnTheline's event riktigt grymma!</p>
      <TeamMemberContainer>
        {team.map((td) => (
          <TDCard
            profileimage={td.data.profileimage}
            mainimage={td.data.mainimage}
            name={td.data.name}
            tags={td.data.tags}
            description={td.data.description}
            inthebag={td.data.inthebag}
            key={td.data.name}
          />
        ))}
      </TeamMemberContainer>
      <h3>Vill du vara med i vårat team och skapa massvis med roliga event?</h3>
      <p>Kontakta oss via email: team@teamontheline.com</p>
    </TeamContainer>
  );
}

export default Team;
