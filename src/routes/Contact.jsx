import styled from "styled-components";

const ContactContainer = styled.ul`
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Contact() {
  return (
    <ContactContainer>
      <h1 style={{marginBottom: 0}}>Kontakta OnTheLine</h1>
      <h3 style={{marginBottom: 0}}>Sponsor's Contact</h3>
      <p style={{marginTop: 0}}>sponsors@teamontheline.com</p>
      <br />  
      <h3 style={{marginBottom: 0}}>Kontakta Tävlingsledningen</h3>
      <p style={{marginTop: 0}}>kontakta@teamontheline.com</p>
    </ContactContainer>
  );
}

export default Contact;
