import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeamProfile from '../components/TeamProfile';
import TeamQuiz from '../components/TeamQuiz';

const Teams = () => {
  // useParams allows us to extract the 'id' parameter from the URL
  const { id } = useParams();
  
  // useNavigate provides a function to change the URL programmatically
  const navigate = useNavigate();
  
  // useState hooks to store component data that will update the UI when changed
  const [teamId, setTeamId] = useState(id || '4819'); // Default to Argentina if no ID is found
  const [teamData, setTeamData] = useState(null);
  
  // We will simply build a flag image URL using the team ID mapping instead of complex blob fetching
  const [teamImage, setTeamImage] = useState(null);
  
  const [squadData, setSquadData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isQuizMode, setIsQuizMode] = useState(false);

  const popularTeams = [
    { name: "Argentina", id: "4819", code: "ar" },
    { name: "France", id: "4481", code: "fr" },
    { name: "Brazil", id: "4748", code: "br" },
    { name: "England", id: "4713", code: "gb-eng" },
    { name: "Portugal", id: "4704", code: "pt" }
  ];

  // Helper function to find a team's country code for their flag
  const getFlagCode = (idToFind) => {
    let foundCode = "un"; // default unknown flag
    for (let i = 0; i < popularTeams.length; i++) {
      if (popularTeams[i].id === idToFind) {
        foundCode = popularTeams[i].code;
      }
    }
    return foundCode;
  };

  // useEffect runs side-effects when the URL 'id' parameter changes
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
    // Prevent the default form submission page refresh
    if (e) {
      e.preventDefault();
    }
    
    // Determine which ID to fetch
    let targetId = teamId;
    if (directId !== null) {
      targetId = directId;
      setTeamId(directId);
    }

    if (targetId === "") {
      return;
    }

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

      // 1. Fetch team statistics
      const dataUrl = "https://sportapi7.p.rapidapi.com/api/v1/team/" + targetId;
      const dataResponse = await fetch(dataUrl, options);
      
      if (dataResponse.ok === false) {
        throw new Error('Team not found or API limit reached');
      }
      
      const result = await dataResponse.json();
      
      if (result !== undefined && result.team !== undefined) {
        setTeamData(result);
        
        // Simple flag URL construction instead of complex Blob image fetching
        const countryCode = getFlagCode(targetId);
        setTeamImage("https://flagcdn.com/w160/" + countryCode + ".png");

      } else {
        throw new Error('Invalid team data format');
      }

      // 2. Fetch the squad roster
      const squadUrl = "https://sportapi7.p.rapidapi.com/api/v1/team/" + targetId + "/players";
      const squadResponse = await fetch(squadUrl, options);
      
      if (squadResponse.ok === true) {
        const squadResult = await squadResponse.json();
        if (squadResult !== undefined && squadResult.players !== undefined) {
          setSquadData(squadResult.players);
        }
      }
      
      // We manually turn off loading state at the end
      setLoading(false);

    } catch (err) {
      console.error(err);
      setError(err.message);
      setTeamData(null);
      setLoading(false); // Make sure to stop loading if an error happens
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (teamId !== "") {
      navigate("/teams/" + teamId);
    }
  };

  return (
    <div className="view-container">
      <div className="page-header">
        <h1 className="page-title">National Teams</h1>
        <p className="page-subtitle">Search for any World Cup team using their ID (e.g. 4819 for Argentina)</p>
      </div>

      <div className="search-section card">
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            className="search-input"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            placeholder="Enter Team ID..."
          />
          <button type="submit" className="search-btn" disabled={loading === true}>
            {loading === true ? 'Searching...' : 'Search'}
          </button>
        </form>
        
        {error !== null ? (
          <div className="error-message">{error}</div>
        ) : null}

        <div className="quick-links-section">
          <span className="quick-links-label">Popular:</span>
          <div className="quick-links-grid">
            {popularTeams.map((team) => {
              return (
                <button 
                  key={team.id} 
                  className="quick-link-btn"
                  onClick={() => navigate("/teams/" + team.id)}
                  disabled={loading === true}
                >
                  {team.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="team-result-section">
        {loading === true ? (
          <div className="loading-state">Loading team data...</div>
        ) : null}
        
        {loading === false && teamData !== null ? (
          <div className="team-content-wrapper">
            
            <div className="game-mode-banner card">
              <div className="banner-content">
                <h3>Test Your Knowledge!</h3>
                <p>Are you a true {teamData.team.name} fan? Take the ultimate quiz.</p>
              </div>
              <button 
                className="btn-primary" 
                onClick={() => setIsQuizMode(true)}
              >
                Enter Game Mode
              </button>
            </div>

            {isQuizMode === true ? (
              <TeamQuiz 
                teamId={teamId} 
                teamName={teamData.team.name} 
                onExit={() => setIsQuizMode(false)} 
              />
            ) : (
              <TeamProfile 
                teamData={teamData} 
                imageUrl={teamImage} 
                squadData={squadData} 
              />
            )}
            
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Teams;
