import NextEvent from "../components/NextEvent";
import EventMap from "../components/EventMap";
import News from "../components/News";

function Home() {
  return (
    <>
      <NextEvent />
      <EventMap url="https://firebasestorage.googleapis.com/v0/b/team-ontheline.appspot.com/o/misc%2Fotl_2025.jpg?alt=media&token=77f0c64e-1618-43bf-9841-3881abd9c27c" />
      <News />
    </>
  );
}

export default Home;
