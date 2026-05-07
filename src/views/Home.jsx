import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const worldCupTeams = [
    { name: "Argentina", id: "4819", code: "ar" },
    { name: "France", id: "4481", code: "fr" },
    { name: "Brazil", id: "4748", code: "br" },
    { name: "England", id: "4713", code: "gb-eng" },
    { name: "Portugal", id: "4704", code: "pt" },
    { name: "Spain", id: "4698", code: "es" },
    { name: "Germany", id: "4711", code: "de" },
    { name: "Italy", id: "4707", code: "it" },
    { name: "Netherlands", id: "4705", code: "nl" },
    { name: "Uruguay", id: "4725", code: "uy" },
    { name: "USA", id: "4724", code: "us" },
    { name: "Belgium", id: "4717", code: "be" }
  ];

  const handleTeamClick = (id) => {
    navigate(`/teams/${id}`);
  };

  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">World Cup 2026</h1>
          <p className="hero-subtitle">The Ultimate National Teams Dashboard</p>
          <div className="hero-badge">Select a nation to begin</div>
        </div>
      </div>

      <div className="world-cup-grid">
        {worldCupTeams.map(team => (
          <div 
            key={team.id} 
            className="team-card card"
            onClick={() => handleTeamClick(team.id)}
          >
            <div className="team-crest-wrapper">
              <img 
                src={`https://flagcdn.com/w160/${team.code}.png`} 
                alt={team.name} 
                className="wc-team-crest" 
                onError={(e) => { e.target.src = '/player-avatar.png'; }}
              />
            </div>
            <h3 className="wc-team-name">{team.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
