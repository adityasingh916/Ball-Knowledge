import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeamProfile = (props) => {
  const navigate = useNavigate();

  if (props.teamData === null) {
    return null;
  }
  
  if (props.teamData.team === undefined) {
    return null;
  }
  
  const team = props.teamData.team;
  const pregameForm = props.teamData.pregameForm;

  const handlePlayerClick = (id) => {
    navigate("/players/" + id);
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) {
      return 'N/A';
    }
    return num.toString();
  };

  let primaryColor = 'green';
  if (team.teamColors !== undefined && team.teamColors.primary !== undefined) {
    primaryColor = team.teamColors.primary;
  }

  let showSquad = false;
  if (props.squadData !== undefined && props.squadData.length > 0) {
    showSquad = true;
  }

  return (
    <div className="profile-box">
      
      <div className="header-box" style={{ borderBottom: "4px solid " + primaryColor }}>
        <div className="info-box">
          <img 
            src={props.imageUrl} 
            alt={team.name} 
            className="team-image" 
          />
          <div className="name-box">
            <h2 className="title">{team.name}</h2>
            <div className="badges">
              <span className="badge">{team.gender}</span>
              <span className="badge">{team.category.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="body-box">
        
        <div className="grid">
          <div className="stat-box">
            <div className="label">Manager</div>
            <div className="value">
              {team.manager !== undefined ? team.manager.name : 'Unknown'}
            </div>
          </div>
          <div className="stat-box">
            <div className="label">National Ranking</div>
            <div className="value">{team.ranking !== undefined ? team.ranking : 'N/A'}</div>
          </div>
        </div>

        <div className="form-box">
          <h3 className="subtitle">Recent Form</h3>
          <div className="badges">
            {pregameForm !== undefined && pregameForm.length > 0 ? (
              pregameForm.map((result, index) => {
                return (
                  <span key={index} className="badge">
                    {result}
                  </span>
                );
              })
            ) : (
              <span>No form data available</span>
            )}
          </div>
        </div>

        {showSquad === true ? (
          <div className="squad-box">
            <h3 className="subtitle">Projected Starting XI</h3>
            <div className="grid">
              
              {props.squadData.slice(0, 11).map((squadMember) => {
                
                let displayName = squadMember.player.name;
                if (squadMember.player.shortName !== undefined) {
                  displayName = squadMember.player.shortName;
                }

                return (
                  <div 
                    key={squadMember.player.id} 
                    className="card"
                    onClick={() => handlePlayerClick(squadMember.player.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src="/player-avatar.png"
                      alt={displayName}
                      className="image"
                    />
                    <span className="text">{displayName}</span>
                  </div>
                );
              })}

            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};

export default TeamProfile;
