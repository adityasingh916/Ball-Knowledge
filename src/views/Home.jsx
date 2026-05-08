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
    navigate("/teams/" + id);
  };

  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-text">
          <h1 className="title">World Cup 2026</h1>
          <p className="subtitle">The Ultimate National Teams Dashboard</p>
          <div className="badge">Select a nation to begin</div>
        </div>
      </div>

      <div className="grid">
        {worldCupTeams.map(team => (
          <div 
            key={team.id} 
            className="card"
            onClick={() => handleTeamClick(team.id)}
          >
            <div className="image-wrapper">
              <img 
                src={"https://flagcdn.com/w160/" + team.code + ".png"} 
                alt={team.name} 
                className="team-image" 
                onError={(e) => { e.target.src = '/player-avatar.png'; }}
              />
            </div>
            <h3 className="team-name">{team.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
