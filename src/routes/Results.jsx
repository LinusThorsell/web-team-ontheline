import Result from "../components/Result";

function ResultPage() {
  return (
    <>
      <Result title="OnTheLine Tour 2024 Resultat" description="Sponsrat av MVP Disc Sports och RocketDiscs.com" eventUrl="results/ontheline2024" roundsToCount={4} />
      <div style={{width: '100vw', height: '0.1em', backgroundColor: 'white'}} />
      <Result title="OnTheLine Tour 2023 Resultat" description="Sponsrat av MVP Disc Sports och RocketDiscs.com" eventUrl="results/ontheline2023" roundsToCount={6} />
    </>
  )
}

export default ResultPage;
