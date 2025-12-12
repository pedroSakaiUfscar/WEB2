import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import BottomNavbar from './components/Layout/BottomNavbar';
import Home from './components/Pages/Home';
import Challenges from './components/Pages/Challenges';
import ArtistProfile from './components/Pages/ArtistProfile'; // NOVO

function App() {
  // Simula roteamento: 'home', 'challenges' ou 'artist'
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />; // Adicionei onNavigate para Home
      case 'challenges':
        return <Challenges />;
      case 'artist':
        return <ArtistProfile />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <Sidebar activePage={currentPage} onNavigate={setCurrentPage} />

      {/* A classe "main" é definida no seu common.css para alinhamento e padding */}
      <main className="main"> 
        {renderPage()}
      </main>
      
      <BottomNavbar activePage={currentPage} onNavigate={setCurrentPage} />
    </>
  );
}

export default App;