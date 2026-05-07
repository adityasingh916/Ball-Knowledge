import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeamProfile from '../components/TeamProfile';
import TeamQuiz from '../components/TeamQuiz';

const Teams = () => {
  // useParams allows us to extract the 'id' parameter from the URL (e.g. /teams/4819 extracts 4819)
  const { id } = useParams();
  
  // useNavigate provides a function to change the URL programmatically
  const navigate = useNavigate();
  
  // useState hooks to store component data that will update the UI when changed
  const [teamId, setTeamId] = useState(id || '4819'); // Default to Argentina if no ID is found
  const [teamData, setTeamData] = useState(null);
  const [teamImage, setTeamImage] = useState(null);
  const [squadData, setSquadData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isQuizMode, setIsQuizMode] = useState(false);

  const popularTeams = [
    { name: "Argentina", id: "4819" },
    { name: "France", id: "4481" },
    { name: "Brazil", id: "4748" },
    { name: "England", id: "4713" },
    { name: "Portugal", id: "4704" }
  ];

  // useEffect is a React Hook that runs side-effects. 
  // The dependency array [id] means this code will ONLY run when the URL 'id' parameter changes.
  useEffect(() => {
    if (id) {
      setTeamId(id);
      fetchTeam(null, id);
    } else {
      fetchTeam(null, teamId);
    }
  }, [id]);

  // An asynchronous function to fetch data from our API without blocking the UI
  const fetchTeam = async (e, directId = null) => {
    // If this function was called by a form submit, prevent the default page refresh
    if (e) e.preventDefault();
    
    // Determine which ID to fetch
    const targetId = directId || teamId;
    if (!targetId.trim()) return;

    if (directId) setTeamId(directId);

    // Update state to show loading indicators and clear out previous data
    setLoading(true);
    setError(null);
    setTeamImage(null);
    setSquadData([]);
    setIsQuizMode(false);

    try {
      // Setup the API request headers as required by RapidAPI
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '32b981aa21mshb566fb1e9bb13eep19eca7jsn25588907c339',
          'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
      };

      // 1. Fetch team statistics and manager info using the 'await' keyword
      const dataUrl = `https://sportapi7.p.rapidapi.com/api/v1/team/${targetId}`;
      const dataResponse = await fetch(dataUrl, options);
      
      // If the API returns an error (like hitting the rate limit), throw an error to go to the catch block
      if (!dataResponse.ok) throw new Error('Team not found or API limit reached');
      
      const result = await dataResponse.json();
      if (result && result.team) {
        setTeamData(result);
      } else {
        throw new Error('Team data not found');
      }

      // 2. Fetch image
      try {
        const imgUrl = `https://sportapi7.p.rapidapi.com/api/v1/team/${targetId}/image`;
        const imgResponse = await fetch(imgUrl, options);
        if (imgResponse.ok) {
          const blob = await imgResponse.blob();
          setTeamImage(URL.createObjectURL(blob));
        }
      } catch (imgErr) {
        console.warn('Could not load team image', imgErr);
      }

      // 3. Fetch squad
      try {
        const squadUrl = `https://sportapi7.p.rapidapi.com/api/v1/team/${targetId}/players`;
        const squadResponse = await fetch(squadUrl, options);
        if (squadResponse.ok) {
          const squadResult = await squadResponse.json();
          setSquadData(squadResult.players || []);
        }
      } catch (sqErr) {
        console.warn('Could not load squad', sqErr);
      }

    } catch (err) {
      console.error(err);
      setError(err.message);
      setTeamData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-container">
      <div className="page-header">
        <h1 className="page-title">National Teams</h1>
        <p className="page-subtitle">Search for any World Cup team using their ID (e.g. 4819 for Argentina)</p>
      </div>

      <div className="search-section card">
        <form onSubmit={fetchTeam} className="search-form">
          <input 
            type="text" 
            className="search-input"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            placeholder="Enter Team ID..."
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}

        <div className="quick-links-section">
          <span className="quick-links-label">Popular:</span>
          <div className="quick-links-grid">
            {popularTeams.map(t => (
              <button 
                key={t.id} 
                className="quick-link-btn"
                onClick={(e) => fetchTeam(e, t.id)}
                disabled={loading}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="player-result-section">
        {loading && <div className="loading-state">Loading team data...</div>}
        
        {!loading && teamData && isQuizMode && (
          <TeamQuiz 
            teamId={teamId} 
            teamName={teamData.team.name} 
            onExit={() => setIsQuizMode(false)} 
          />
        )}

        {!loading && teamData && !isQuizMode && (
          <div className="team-profile-wrapper">
            <div className="quiz-banner-frame">
              <div className="quiz-banner-content">
                <div className="quiz-banner-icon">🧠</div>
                <div className="quiz-banner-text">
                  <h3>Ball Knowledge Challenge</h3>
                  <p>Test your trivia skills on {teamData.team.name}!</p>
                </div>
              </div>
              <button className="start-quiz-btn" onClick={() => setIsQuizMode(true)}>
                Take the Quiz
              </button>
            </div>
            <TeamProfile 
              teamData={teamData} 
              imageUrl={teamImage} 
              squadData={squadData} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
