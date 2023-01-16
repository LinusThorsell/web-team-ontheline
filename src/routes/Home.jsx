import NextEvent from "../components/NextEvent";
import EventMap from "../components/EventMap";
import News from "../components/News";

function Home() {
  return (
    <>
      <NextEvent />
      <EventMap url="https://firebasestorage.googleapis.com/v0/b/team-ontheline.appspot.com/o/misc%2FOnTheLine-schedule%20(2).jpg?alt=media&token=51d31b4e-f05c-4f48-ab59-c1ed01a2bfba" />
      <News />
    </>
  );
}

export default Home;
