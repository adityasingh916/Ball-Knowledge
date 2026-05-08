import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeamProfile = (props) => {
  const navigate = useNavigate();

  // Simple if checks instead of complex && or destructuring
  if (props.teamData === null) {
    return null;
  }
  
  if (props.teamData.team === undefined) {
    return null;
  }
  
  // Extracting variables simply
  const team = props.teamData.team;
  const pregameForm = props.teamData.pregameForm;

  const handlePlayerClick = (id) => {
    navigate("/players/" + id);
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) {
      return 'N/A';
    }
    // Simple string conversion instead of complex Intl formatters
    return num.toString();
  };

  const getFormClass = (result) => {
    if (result === 'W') {
      return 'form-badge win';
    } else if (result === 'L') {
      return 'form-badge loss';
    } else if (result === 'D') {
      return 'form-badge draw';
    } else {
      return 'form-badge';
    }
  };

  // Simple variable assignment instead of optional chaining (?.)
  let primaryColor = 'var(--accent-color)';
  if (team.teamColors !== undefined && team.teamColors.primary !== undefined) {
    primaryColor = team.teamColors.primary;
  }

  // Determine if we should show the squad section
  let showSquad = false;
  if (props.squadData !== undefined && props.squadData.length > 0) {
    showSquad = true;
  }

  return (
    <div className="team-profile-container fade-in">
      
      <div className="profile-header" style={{ borderBottom: "4px solid " + primaryColor }}>
        <div className="profile-main-info">
          <img 
            src={props.imageUrl} 
            alt={team.name} 
            className="team-crest" 
          />
          <div className="name-container">
            <h2 className="team-name">{team.name}</h2>
            <div className="team-badges">
              <span className="badge">{team.gender}</span>
              <span className="badge category-badge">{team.category.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-body">
        
        <div className="stats-grid premium-grid">
          <div className="stat-box">
            <div className="stat-label">Manager</div>
            <div className="stat-value small-val">
              {team.manager !== undefined ? team.manager.name : 'Unknown'}
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-label">National Ranking</div>
            <div className="stat-value">{team.ranking !== undefined ? team.ranking : 'N/A'}</div>
          </div>
        </div>

        <div className="form-section card mt-4">
          <h3 className="section-title">Recent Form</h3>
          <div className="form-badges">
            {pregameForm !== undefined && pregameForm.length > 0 ? (
              pregameForm.map((result, index) => {
                return (
                  <span key={index} className={getFormClass(result)}>
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
          <div className="squad-section mt-4">
            <h3 className="squad-title">Projected Starting XI</h3>
            <div className="squad-grid starting-xi-grid">
              
              {props.squadData.slice(0, 11).map((squadMember) => {
                
                let displayName = squadMember.player.name;
                if (squadMember.player.shortName !== undefined) {
                  displayName = squadMember.player.shortName;
                }

                return (
                  <div 
                    key={squadMember.player.id} 
                    className="squad-player-card"
                    onClick={() => handlePlayerClick(squadMember.player.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src="/player-avatar.png"
                      alt={displayName}
                      className="squad-player-img"
                    />
                    <span className="squad-player-name">{displayName}</span>
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
