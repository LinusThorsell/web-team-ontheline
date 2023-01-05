import NextEvent from "../components/NextEvent";
import EventMap from "../components/EventMap";
import News from "../components/News";

function Home() {
  return (
    <>
      <NextEvent name="Hästhagen DGC" date="15/4" />
      <EventMap url="https://teamontheline.com/static/media/map.cf8e15df11636bdd5afe.webp" />
      <News />
    </>
  );
}

export default Home;
