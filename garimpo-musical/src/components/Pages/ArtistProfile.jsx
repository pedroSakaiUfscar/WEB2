import React, { useState } from 'react';
import '../../styles/artist_profile.css'; 

const ArtistProfile = () => {
  const [activeTab, setActiveTab] = useState('songs'); 

  const songsData = [
    { id: 1, title: 'Midnight Dreams', plays: '1.2M reproduções', duration: '3:45' },
    { id: 2, title: 'Lost in the City', plays: '980K reproduções', duration: '2:58' },
    { id: 3, title: 'Echoes', plays: '750K reproduções', duration: '4:12' },
  ];

  const renderSongItem = (song) => (
    <div className="song-item" key={song.id}>
      <a href="#">
        <div className="song-item-icon">
          <img src="/assets/music.svg" width="20" height="20" alt="Ícone de música" />
        </div>
        <div className="song-item-details">
          <h4>{song.title}</h4>
          <p>{song.plays}</p>
        </div>
        <span className="song-item-duration">{song.duration}</span>
      </a>
    </div>
  );

  return (
    <>
      <div className="artist-header">
        <img 
          src="https://via.placeholder.com/1400x400?text=Banner+do+Artista" 
          alt="Banner do Artista" 
          className="profile-banner-img"
        />

        <div className="artist-header-content">
          <img 
            src="https://via.placeholder.com/300x300?text=Foto+do+Artista" 
            alt="Foto do Artista" 
            className="profile-picture"
          />
          <div className="profile-info">
            <p className="subtitle">Pop Alternativo</p>
            <h1>Taylor Swift</h1>
            <div className="profile-actions">
              <button className="btn btn-primary">
                <img src="/assets/heart.svg" width="16" height="16" alt="Icone de coração" />
                Seguir
              </button>
              <button className="btn btn-secondary">
                <img src="/assets/play.svg" width="16" height="16" alt="Icone de play" />
                Tocar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="tab-bar artist-profile-tab-bar">
        <button 
          className={`tab-button ${activeTab === 'songs' ? 'active' : ''}`}
          onClick={() => setActiveTab('songs')}
        >
          Músicas
        </button>
        <button 
          className={`tab-button ${activeTab === 'community' ? 'active' : ''}`}
          onClick={() => setActiveTab('community')}
        >
          Comunidade
        </button>
        <button 
          className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          Sobre
        </button>
      </div>

      <div className="tab-content-container">
        {activeTab === 'songs' && (
          <div id="songs" className="tab-content songs-list active">
            {songsData.map(renderSongItem)}
          </div>
        )}

        {activeTab === 'community' && (
          <div id="community" className="tab-content community-content">
            <p style={{ padding: '1rem' }}>Esta é a seção da comunidade. Em breve, postagens e interações!</p>
          </div>
        )}

        {activeTab === 'about' && (
          <div id="about" className="tab-content about-content">
            <h3 style={{ marginBottom: '1rem' }}>Biografia</h3>
            <p>Taylor Swift é uma cantora e compositora americana. Uma das artistas mais vendidas de todos os tempos, ela é conhecida por suas narrativas em canções sobre sua vida pessoal.</p>
          </div>
        )}
      </div>
      
      <br /><br /><br /> 
    </>
  );
};

export default ArtistProfile;