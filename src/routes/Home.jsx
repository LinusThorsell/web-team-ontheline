import NextEvent from "../components/NextEvent";
import EventMap from "../components/EventMap";
import News from "../components/News";

function Home() {
  return (
    <>
      <NextEvent />
      <EventMap url="https://teamontheline.com/static/media/map.cf8e15df11636bdd5afe.webp" />
      <News />
    </>
  );
}

export default Home;
