import React from 'react';

const PlayerProfile = (props) => {
  if (props.player === null || props.player === undefined) {
    return null;
  }

  const player = props.player;
  const imageUrl = props.imageUrl;

  // Simple age calculation without complex Date logic
  const getAge = (dateString) => {
    if (dateString === null || dateString === undefined) {
      return 'N/A';
    }
    
    // Simplest way to get age roughly:
    const birthYear = parseInt(dateString.substring(0, 4));
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age;
  };

  const formatValue = (value) => {
    if (value === null || value === undefined) {
      return 'N/A';
    }
    // Simple formatting instead of Intl.NumberFormat
    return "€" + value.toString();
  };

  let displayImageUrl = "/player-avatar.png";
  if (imageUrl !== null && imageUrl !== undefined) {
    displayImageUrl = imageUrl;
  }

  let jerseyNumber = '-';
  if (player.jerseyNumber !== undefined) {
    jerseyNumber = player.jerseyNumber;
  } else if (player.shirtNumber !== undefined) {
    jerseyNumber = player.shirtNumber;
  }

  let countryName = "";
  if (player.country !== undefined && player.country.name !== undefined) {
    countryName = player.country.name;
  }

  return (
    <div className="player-profile-card">
      <div className="profile-header">
        <div className="profile-main-info">
          <div className="player-avatar-container">
            <img src={displayImageUrl} alt={player.name} className="player-avatar" />
          </div>
          <div className="jersey-number">{jerseyNumber}</div>
          <div className="name-container">
            <h2 className="player-name">{player.name}</h2>
            <div className="player-badges">
              <span className="badge position-badge">{player.position}</span>
              
              {countryName !== "" ? (
                <span className="badge country-badge">{countryName}</span>
              ) : null}
              
            </div>
          </div>
        </div>
      </div>

      <div className="profile-body">
        <div className="stats-grid premium-grid">
          <div className="stat-box">
            <div className="stat-label">Age</div>
            <div className="stat-value small-val">{getAge(player.dateOfBirth)}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Height</div>
            <div className="stat-value small-val">
              {player.height !== undefined ? player.height + "m" : "N/A"}
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Preferred Foot</div>
            <div className="stat-value small-val">
              {player.preferredFoot !== undefined ? player.preferredFoot : "N/A"}
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Market Value</div>
            <div className="stat-value small-val">{formatValue(player.marketValue)}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlayerProfile;
