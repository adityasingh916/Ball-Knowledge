import React from 'react';

const PlayerProfile = (props) => {
  if (props.player === null || props.player === undefined) {
    return null;
  }

  const player = props.player;
  const imageUrl = props.imageUrl;

  const getAge = (dateString) => {
    if (dateString === null || dateString === undefined) {
      return 'N/A';
    }
    
    const birthYear = parseInt(dateString.substring(0, 4));
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age;
  };

  const formatValue = (value) => {
    if (value === null || value === undefined) {
      return 'N/A';
    }
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
    <div className="profile-box">
      <div className="header-box">
        <div className="info-box">
          <div className="image-wrapper">
            <img src={displayImageUrl} alt={player.name} className="image" />
          </div>
          <div className="number">{jerseyNumber}</div>
          <div className="name-box">
            <h2 className="title">{player.name}</h2>
            <div className="badges">
              <span className="badge">{player.position}</span>
              
              {countryName !== "" ? (
                <span className="badge">{countryName}</span>
              ) : null}
              
            </div>
          </div>
        </div>
      </div>

      <div className="body-box">
        <div className="grid">
          <div className="stat-box">
            <div className="label">Age</div>
            <div className="value">{getAge(player.dateOfBirth)}</div>
          </div>
          <div className="stat-box">
            <div className="label">Height</div>
            <div className="value">
              {player.height !== undefined ? player.height + "m" : "N/A"}
            </div>
          </div>
          <div className="stat-box">
            <div className="label">Preferred Foot</div>
            <div className="value">
              {player.preferredFoot !== undefined ? player.preferredFoot : "N/A"}
            </div>
          </div>
          <div className="stat-box">
            <div className="label">Market Value</div>
            <div className="value">{formatValue(player.marketValue)}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlayerProfile;
