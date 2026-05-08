import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TeamProfile from '../components/TeamProfile';
import TeamQuiz from '../components/TeamQuiz';

const Teams = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [teamId, setTeamId] = useState(id || '4819');
  const [teamData, setTeamData] = useState(null);
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

  const getFlagCode = (idToFind) => {
    let foundCode = "un";
    for (let i = 0; i < popularTeams.length; i++) {
      if (popularTeams[i].id === idToFind) {
        foundCode = popularTeams[i].code;
      }
    }
    return foundCode;
  };

  useEffect(() => {
    if (id) {
      setTeamId(id);
      fetchTeam(null, id);
    } else {
      fetchTeam(null, teamId);
    }
  }, [id]);

  const fetchTeam = async (e, directId = null) => {
    if (e) {
      e.preventDefault();
    }
    
    let targetId = teamId;
    if (directId !== null) {
      targetId = directId;
      setTeamId(directId);
    }

    if (targetId === "") {
      return;
    }

    setLoading(true);
    setError(null);
    setTeamImage(null);
    setSquadData([]);
    setIsQuizMode(false);

    try {
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '32b981aa21mshb566fb1e9bb13eep19eca7jsn25588907c339',
          'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
      };

      const dataUrl = "https://sportapi7.p.rapidapi.com/api/v1/team/" + targetId;
      const dataResponse = await fetch(dataUrl, options);
      
      if (dataResponse.ok === false) {
        throw new Error('Team not found or API limit reached');
      }
      
      const result = await dataResponse.json();
      
      if (result !== undefined && result.team !== undefined) {
        setTeamData(result);
        
        const countryCode = getFlagCode(targetId);
        setTeamImage("https://flagcdn.com/w160/" + countryCode + ".png");

      } else {
        throw new Error('Invalid team data format');
      }

      const squadUrl = "https://sportapi7.p.rapidapi.com/api/v1/team/" + targetId + "/players";
      const squadResponse = await fetch(squadUrl, options);
      
      if (squadResponse.ok === true) {
        const squadResult = await squadResponse.json();
        if (squadResult !== undefined && squadResult.players !== undefined) {
          setSquadData(squadResult.players);
        }
      }
      
      setLoading(false);

    } catch (err) {
      console.error(err);
      setError(err.message);
      setTeamData(null);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (teamId !== "") {
      navigate("/teams/" + teamId);
    }
  };

  return (
    <div className="page">
      <div className="header">
        <h1 className="title">National Teams</h1>
        <p className="subtitle">Search for any World Cup team using their ID (e.g. 4819 for Argentina)</p>
      </div>

      <div className="search-box">
        <form onSubmit={handleSearch} className="form">
          <input 
            type="text" 
            className="input"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            placeholder="Enter Team ID..."
          />
          <button type="submit" className="button" disabled={loading === true}>
            {loading === true ? 'Searching...' : 'Search'}
          </button>
        </form>
        
        {error !== null ? (
          <div className="error">{error}</div>
        ) : null}

        <div className="links-box">
          <span className="label">Popular:</span>
          <div className="grid">
            {popularTeams.map((team) => {
              return (
                <button 
                  key={team.id} 
                  className="button-small"
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

      <div className="result-box">
        {loading === true ? (
          <div className="loading">Loading team data...</div>
        ) : null}
        
        {loading === false && teamData !== null ? (
          <div className="content-box">
            
            <div className="banner">
              <div className="banner-text">
                <h3>Test Your Knowledge!</h3>
                <p>Are you a true {teamData.team.name} fan? Take the ultimate quiz.</p>
              </div>
              <button 
                className="button" 
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
