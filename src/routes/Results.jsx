import Result from "../components/Result";

function ResultPage() {
  return (
    <>
      <h2 style={{textAlign: 'center'}}>Vi har lite problem med scoreräkning för OTL 2024, vi är medvetna om att det finns fel i listan nedan och arbetar för att lösa dessa.</h2>
      <Result title="OnTheLine Tour 2024 Resultat" description="Sponsrat av MVP Disc Sports och RocketDiscs.com" eventUrl="results/ontheline2024" roundsToCount={4} />
      <div style={{width: '100vw', height: '0.1em', backgroundColor: 'white'}} />
      <Result title="OnTheLine Tour 2023 Resultat" description="Sponsrat av MVP Disc Sports och RocketDiscs.com" eventUrl="results/ontheline2023" roundsToCount={6} />
    </>
  )
}

export default ResultPage;
