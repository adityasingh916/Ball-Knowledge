import React from 'react';
import { useNavigate } from 'react-router-dom';

// We accept props (teamData, imageUrl, squadData) passed down from the parent component (Teams.jsx)
const TeamProfile = ({ teamData, imageUrl, squadData }) => {
  // useNavigate is a hook that gives us a function to change the URL programmatically
  const navigate = useNavigate();

  // Conditional Rendering: If we don't have team data yet, render nothing (null)
  if (!teamData || !teamData.team) return null;
  
  // Destructuring the teamData object to easily access 'team' and 'pregameForm' variables
  const { team, pregameForm } = teamData;

  // This function is triggered when the user clicks on a player card
  const handlePlayerClick = (id) => {
    // Navigate to the player's profile page using their specific ID
    navigate(`/players/${id}`);
  };

  // Helper function to format large numbers with commas (e.g., 50000 -> 50,000)
  const formatNumber = (num) => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getFormClass = (result) => {
    if (result === 'W') return 'form-badge win';
    if (result === 'L') return 'form-badge loss';
    if (result === 'D') return 'form-badge draw';
    return 'form-badge';
  };

  const primaryColor = team.teamColors?.primary || 'var(--accent-color)';
  const secondaryColor = team.teamColors?.secondary || '#1e293b';

  return (
    <div className="player-profile-card team-profile-card" style={{ '--team-primary': primaryColor, '--team-secondary': secondaryColor }}>
      <div className="profile-header team-header">
        <div className="profile-main-info">
          <div className="player-avatar-container team-crest-container">
            <img src={imageUrl || "/player-avatar.png"} alt={team.name} className="player-avatar team-crest" />
          </div>
          <div className="name-container">
            <h2 className="player-name">{team.name}</h2>
            <div className="player-badges">
              {team.country?.name && (
                <span className="badge country-badge">{team.country.name}</span>
              )}
              {team.primaryUniqueTournament?.name && (
                <span className="badge position-badge tournament-badge" style={{ background: primaryColor, color: '#000' }}>
                  {team.primaryUniqueTournament.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="profile-body">
        {pregameForm && (
          <div className="form-section">
            <div className="form-rating-box">
              <span className="rating-label">Avg Rating</span>
              <span className="rating-value">{pregameForm.avgRating || 'N/A'}</span>
            </div>
            {pregameForm.form && pregameForm.form.length > 0 && (
              <div className="recent-form">
                <span className="form-label">Recent Form</span>
                <div className="form-badges-container">
                  {pregameForm.form.map((res, idx) => (
                    <span key={idx} className={getFormClass(res)}>{res}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="stats-grid premium-grid">
          <div className="stat-box">
            <div className="stat-label">Manager</div>
            <div className="stat-value text-val">{team.manager?.name || 'N/A'}</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Stadium</div>
            <div className="stat-value text-val">{team.venue?.name || 'N/A'}</div>
            {team.venue?.city?.name && <div className="stat-sublabel">{team.venue.city.name}</div>}
          </div>
          <div className="stat-box">
            <div className="stat-label">Capacity</div>
            <div className="stat-value small-val">{formatNumber(team.venue?.capacity)}</div>
          </div>
        </div>

        {/* Conditional Rendering: Only show the squad section if squadData exists and has items */}
        {squadData && squadData.length > 0 && (
          <div className="squad-section mt-4">
            <h3 className="squad-title">Projected Starting XI</h3>
            <div className="squad-grid starting-xi-grid">
              {/* List Rendering: We take the first 11 players and use .map() to create HTML elements for each one */}
              {/* Every item in a mapped list needs a unique 'key' prop (we use the player ID) */}
              {squadData.slice(0, 11).map((squadMember) => (
                <div 
                  key={squadMember.player.id} 
                  className="squad-player-card"
                  onClick={() => handlePlayerClick(squadMember.player.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src="/player-avatar.png"
                    alt={squadMember.player.name}
                    className="squad-player-img"
                  />
                  {/* If the player has a shortName, use it, otherwise fallback to their full name */}
                  <span className="squad-player-name">{squadMember.player.shortName || squadMember.player.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamProfile;
