import NextEvent from "../components/NextEvent";
import EventMap from "../components/EventMap";
import News from "../components/News";

function Home() {
  return (
    <>
      <NextEvent />
      <EventMap url="https://firebasestorage.googleapis.com/v0/b/team-ontheline.appspot.com/o/misc%2Fschedule.jpg?alt=media&token=3f356bb1-a601-43e0-9d70-98f8207f0cb6" />
      <News />
    </>
  );
}

export default Home;
