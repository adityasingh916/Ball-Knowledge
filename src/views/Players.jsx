import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlayerProfile from '../components/PlayerProfile';

const Players = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [playerId, setPlayerId] = useState(id || '12994');
  const [playerData, setPlayerData] = useState(null);
  
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState(null);

  const popularPlayers = [
    { name: "Cristiano Ronaldo", id: "750" },
    { name: "Lionel Messi", id: "12994" },
    { name: "Neymar Jr", id: "124712" },
    { name: "Kylian Mbappé", id: "826643" }
  ];

  useEffect(() => {
    if (id !== undefined) {
      setPlayerId(id);
      fetchPlayer(null, id);
    } else {
      fetchPlayer(null, playerId);
    }
  }, [id]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (playerId !== "") {
      navigate("/players/" + playerId);
    }
  };

  const fetchPlayer = async (e, directId = null) => {
    if (e !== null) {
      e.preventDefault();
    }
    
    let targetId = playerId;
    if (directId !== null) {
      targetId = directId;
    }

    if (targetId === "") {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = "https://sportapi7.p.rapidapi.com/api/v1/player/" + targetId;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '32b981aa21mshb566fb1e9bb13eep19eca7jsn25588907c339',
          'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);
      
      if (response.ok === false) {
        throw new Error('Player not found or API limit reached');
      }
      
      const result = await response.json();
      
      if (result !== undefined && result.player !== undefined) {
        setPlayerData(result.player);
      } else {
        throw new Error('Player data not found');
      }

      setLoading(false);

    } catch (err) {
      console.error(err);
      setError(err.message);
      setPlayerData(null);
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="header">
        <h1 className="title">Player Database</h1>
        <p className="subtitle">Search for any World Cup player using their ID (e.g. 12994 for Messi)</p>
      </div>

      <div className="search-box">
        <form onSubmit={handleSearch} className="form">
          <input 
            type="text" 
            className="input"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            placeholder="Enter Player ID..."
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
            {popularPlayers.map((p) => {
              return (
                <button 
                  key={p.id} 
                  className="button-small"
                  onClick={() => navigate("/players/" + p.id)}
                  disabled={loading === true}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="result-box">
        {loading === true ? (
          <div className="loading">Loading player data...</div>
        ) : null}
        
        {loading === false && playerData !== null ? (
          <PlayerProfile player={playerData} imageUrl="/player-avatar.png" />
        ) : null}
      </div>
    </div>
  );
};

export default Players;
