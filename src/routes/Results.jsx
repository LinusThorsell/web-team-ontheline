import React, { useState, useEffect } from 'react';
import Result from "../components/Result";

function ResultPage() {
  const [results, setResults] = useState([]); // State to hold an array of fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Function to fetch data for all leaderboards
    const fetchData = async () => {
      try {
        // Array of leaderboard IDs that you want to fetch
        let leaderboardIds = await fetch('https://api.teamontheline.com/api/tour/list').then(res => { return res.json() });
        leaderboardIds = leaderboardIds.body.Tours.map(x => x.id);

        // Fetch all leaderboards in parallel
        const responses = await Promise.all(
          leaderboardIds.map(id =>
            fetch(`https://api.teamontheline.com/api/tour/get/leaderboard/${id}`)
          )
        );

        // Check if any of the responses have failed
        const errors = responses.filter(response => !response.ok);
        if (errors.length > 0) {
          throw new Error(`Error: ${errors[0].statusText}`);
        }

        // Parse JSON data from all the responses
        const data = await Promise.all(responses.map(response => response.json()));

        // Set the fetched data
        setResults(data);
      } catch (error) {
        setError(error.message); // Set the error if one occurs
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Render an error state if there's an error
  }

  return (
    <>
      {results.map((result, index) => (
        <Result key={index} result={result.body.TourLeaderboard} />
      ))}
    </>
  );
}

export default ResultPage;
