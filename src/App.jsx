import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Teams from './views/Teams';
import Players from './views/Players';
import SquadBuilder from './views/SquadBuilder';

function App() {
  return (
    // BrowserRouter is the main wrapper that enables routing in our React app
    <BrowserRouter>
      <div className="app-container">
        {/* The Navbar will always be visible on every page */}
        <Navbar />
        
        <main className="main-content">
          {/* The Routes component looks at the current URL and decides which Route to render */}
          <Routes>
            {/* When the URL is exactly "/", it shows the Home component */}
            <Route path="/" element={<Home />} />
            
            {/* When the URL is "/teams", it shows the Teams component */}
            <Route path="/teams" element={<Teams />} />
            
            {/* The ":id" part is a dynamic parameter. It allows us to go to "/teams/4819" and grab the ID inside the Teams component */}
            <Route path="/teams/:id" element={<Teams />} />
            
            <Route path="/players" element={<Players />} />
            <Route path="/players/:id" element={<Players />} />
            <Route path="/squad-builder" element={<SquadBuilder />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
