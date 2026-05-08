import React, { useState, useEffect } from 'react';

const SquadBuilder = () => {
  const [budget, setBudget] = useState(0);
  const [players, setPlayers] = useState([]);
  const [selectedSquad, setSelectedSquad] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); 

  useEffect(() => {
    const randomBudget = Math.floor(Math.random() * (1300 - 900 + 1)) + 900;
    setBudget(randomBudget);
    fetchPlayers();
  }, []);

  useEffect(() => {
    const spent = selectedSquad.reduce((acc, player) => acc + player.price, 0);
    setTotalSpent(spent);

    if (spent > budget && budget > 0) {
      setGameStatus('lost');
    } else if (selectedSquad.length === 11 && spent <= budget) {
      setGameStatus('won');
    } else {
      setGameStatus('playing');
    }
  }, [selectedSquad, budget]);

  const fetchPlayers = async () => {
    const mockData = [
      { id: 1, name: "Kylian Mbappé", image: "/player-avatar.png", price: 180 },
      { id: 2, name: "Erling Haaland", image: "/player-avatar.png", price: 170 },
      { id: 3, name: "Lionel Messi", image: "/player-avatar.png", price: 150 },
      { id: 4, name: "Vinícius Júnior", image: "/player-avatar.png", price: 140 },
      { id: 5, name: "Jude Bellingham", image: "/player-avatar.png", price: 140 },
      { id: 6, name: "Kevin De Bruyne", image: "/player-avatar.png", price: 130 },
      
      { id: 7, name: "Harry Kane", image: "/player-avatar.png", price: 120 },
      { id: 8, name: "Bukayo Saka", image: "/player-avatar.png", price: 110 },
      { id: 9, name: "Rodri", image: "/player-avatar.png", price: 100 },
      { id: 10, name: "Declan Rice", image: "/player-avatar.png", price: 95 },
      { id: 11, name: "Virgil van Dijk", image: "/player-avatar.png", price: 90 },
      { id: 12, name: "Ruben Dias", image: "/player-avatar.png", price: 85 },
      { id: 13, name: "Trent A-Arnold", image: "/player-avatar.png", price: 80 },
      { id: 14, name: "William Saliba", image: "/player-avatar.png", price: 75 },
      
      { id: 15, name: "Alisson Becker", image: "/player-avatar.png", price: 70 },
      { id: 16, name: "Julian Alvarez", image: "/player-avatar.png", price: 70 },
      { id: 17, name: "Ederson", image: "/player-avatar.png", price: 65 },
      { id: 18, name: "Lisandro Martinez", image: "/player-avatar.png", price: 60 },
      { id: 19, name: "Alejandro Garnacho", image: "/player-avatar.png", price: 55 },
      { id: 20, name: "Emiliano Martinez", image: "/player-avatar.png", price: 50 },
      { id: 21, name: "Pau Cubarsi", image: "/player-avatar.png", price: 45 },
      { id: 22, name: "Kobbie Mainoo", image: "/player-avatar.png", price: 40 },
      { id: 23, name: "Guglielmo Vicario", image: "/player-avatar.png", price: 40 }
    ];
    setPlayers(mockData);
  };

  const handleSelectPlayer = (player) => {
    if (gameStatus === 'lost' || gameStatus === 'won') return;
    if (selectedSquad.length >= 11) return;
    if (selectedSquad.find(p => p.id === player.id)) return;
    
    setSelectedSquad([...selectedSquad, player]);
  };

  const resetGame = () => {
    const randomBudget = Math.floor(Math.random() * (1300 - 900 + 1)) + 900;
    setBudget(randomBudget);
    setSelectedSquad([]);
    setGameStatus('playing');
  };

  let headerStatusClass = "stat";
  if (gameStatus === 'lost') {
    headerStatusClass = "stat text-red";
  }

  return (
    <div className="page">
      <div className="header">
        <h1 className="title">Budget Squad Builder</h1>
        <div className="stats-box">
          <div className="stat">
            <span className="label">Total Budget</span>
            <span className="value">${budget}M</span>
          </div>
          <div className={headerStatusClass}>
            <span className="label">Total Spent</span>
            <span className="value">${totalSpent}M</span>
          </div>
          <div className="stat">
            <span className="label">Players</span>
            <span className="value">{selectedSquad.length} / 11</span>
          </div>
        </div>
      </div>

      {gameStatus === 'lost' && (
        <div className="banner busted">
          <h2>Busted! You exceeded the budget.</h2>
          <button onClick={resetGame} className="button">Try Again</button>
        </div>
      )}
      
      {gameStatus === 'won' && (
        <div className="banner won">
          <h2>Challenge Completed! You Win!</h2>
          <button onClick={resetGame} className="button">Play Again</button>
        </div>
      )}

      <div className="layout">
        
        <div className="players-section">
          <h2 className="subtitle">Available Players</h2>
          <div className="grid">
            {players.map(player => {
              const isSelected = selectedSquad.find(p => p.id === player.id);
              
              let cardClass = "card";
              if (isSelected) {
                cardClass += " selected";
              }
              if (gameStatus !== 'playing') {
                cardClass += " disabled";
              }

              return (
                <div 
                  key={player.id} 
                  className={cardClass}
                  onClick={() => handleSelectPlayer(player)}
                >
                  <img src={player.image} alt={player.name} className="image" />
                  <div className="info">
                    <span className="name">{player.name}</span>
                    <span className="price">${player.price}M</span>
                  </div>
                  {isSelected && <div className="overlay">Selected</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="sidebar">
          <h2 className="subtitle">Your Squad</h2>
          <div className="list">
            {selectedSquad.length === 0 ? (
              <p className="empty-text">No players selected yet.</p>
            ) : (
              selectedSquad.map((p, index) => (
                <div key={p.id} className="list-item">
                  <span className="number">{index + 1}</span>
                  <span className="name">{p.name}</span>
                  <span className="price">${p.price}M</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SquadBuilder;
