import styled from "styled-components";
import TDCard from "../components/TDCard";

const TDData = [
  {
    profileimage: "",
    mainimage:
      "https://www.pdga.com/files/styles/large/public/pictures/picture-1959196-1649747166.jpg?itok=XSIJxB6Z",
    name: "Linus Thorsell",
    tags: "Tour Sponsorship, Business, Website",
    description: "Linus är en av grundarna till OnTheLine och ansvarar för allt som har med Tour Sponsorship, Business och Website att göra.",
    inthebag: "some great discs from MVP discs",
  },
  {
    profileimage: "",
    mainimage:
      "https://www.pdga.com/files/styles/large/public/pictures/picture-1959196-1649747166.jpg?itok=XSIJxB6Z",
    name: "Vincent Müller",
    tags: "Design, Budget Planner",
    description: "Vincent är en av grundarna till OnTheLine och ansvarar för allt som har med Design och Budget Planner att göra.",
    inthebag: "some great discs from MVP discs",
  },
  {
    profileimage: "",
    mainimage:
      "https://www.pdga.com/files/styles/large/public/pictures/picture-1959196-1649747166.jpg?itok=XSIJxB6Z",
    name: "Robert Sjöblom",
    tags: "Operations, Events, Per Event Sponsorships",
    description: "Robert är ett nyförvärv för 2023 och ansvarar för allt som har med Operations, Events och Per Event Sponsorships att göra.",
    inthebag: "some great discs from MVP discs",
  },
];

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
  justify-content: space-evenly;
`;

function Team() {
  return (
    <TeamContainer>
      <h1>Team OnTheLine 2023</h1>
      <p>Det är vi som kommer göra OnTheline's event riktigt grymma!</p>
      <TeamMemberContainer>
        {TDData.map((td) => (
          <TDCard
            profileimage={td.profileimage}
            mainimage={td.mainimage}
            name={td.name}
            tags={td.tags}
            description={td.description}
            inthebag={td.inthebag}
            key={td.name}
          />
        ))}
      </TeamMemberContainer>
      <h3>Vill du vara med i vårat team och skapa massvis med roliga event?</h3>
      <p>Kontakta oss via email: team@teamontheline.com</p>
    </TeamContainer>
  );
}

export default Team;
