import React, { useState, useEffect } from "react";
import "../../styles/home.css";

const Home = () => {
  const [releases, setReleases] = useState([]);
  const [suggestedArtists, setSuggestedArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const featuredChallenge = {
    title: "Explorador Musical",
    description: "Ouça 10 artistas novos esta semana e ganhe 100 pontos!",
    progress: 60,
    progressText: "6/10",
  };

  const fetchUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };
            setLocation(userLocation); 
            resolve(userLocation);     
          },
          (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            setLocation(null);
            resolve(null); 
          }
        );
      } else {
        setLocation(null);
        resolve(null); 
      }
    });
  };

  const fetchHomeData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const releases = [
      {
        title: "Folklore",
        subtitle: "Folk Pop",
        img: "https://assets.b9.com.br/wp-content/uploads/2020/07/Taylor-Swift-Folklore-capa.jpg",
      },
      {
        title: "Mayhem",
        subtitle: "Dark Pop",
        img: "https://upload.wikimedia.org/wikipedia/pt/0/0a/Lady_Gaga_-_Mayhem.jpg",
      },
      {
        title: "Debí Tirar Más Fotos",
        subtitle: "Jibaro",
        img: "https://upload.wikimedia.org/wikipedia/pt/a/a5/Deb%C3%AD_Tirar_M%C3%A1s_Fotos.png?20250704014249",
      },
      {
        title: "In Rainbows",
        subtitle: "Rock Alternativo",
        img: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/96/Radiohead_-_In_Rainbows.jpg/250px-Radiohead_-_In_Rainbows.jpg",
      },
      {
        title: "Gracinha",
        subtitle: "R&B Alternativo",
        img: "https://upload.wikimedia.org/wikipedia/pt/c/ca/Gracinha_-_Manu_Gavassi.png",
      },
    ];

    const suggestedArtists = [
      {
        title: "In Rainbows",
        subtitle: "Rock Alternativo",
        img: "https://upload.wikimedia.org/wikipedia/pt/thumb/9/96/Radiohead_-_In_Rainbows.jpg/250px-Radiohead_-_In_Rainbows.jpg",
      },
      {
        title: "Gracinha",
        subtitle: "R&B Alternativo",
        img: "https://upload.wikimedia.org/wikipedia/pt/c/ca/Gracinha_-_Manu_Gavassi.png",
      },
    ];

    return { releases, suggestedArtists };
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const userLocation = await fetchUserLocation();
      
      const data = await fetchHomeData();

      setReleases(data.releases);
      setSuggestedArtists(data.suggestedArtists);
    } catch (err) {
      console.error("Erro ao buscar dados da API:", err);
      setError("Não foi possível carregar o conteúdo. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="main-loading">
        <div className="spinner"></div> 
        <p>Carregando conteúdo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-error">
        <p>{error}</p>
      </div>
    );
  }

  const HomeCard = ({ item }) => (
    <div className="home-card">
      <a href="#">
        <div className="home-card-image">
          <img
            src={item.img}
            alt={item.title}
            className="home-card-image-tag"
          />
        </div>
        <h4>{item.title}</h4>
        <p>{item.subtitle}</p>
      </a>
    </div>
  );

  return (
    <>
      <header className="home-header">
        <div>
          <h1>Explorar</h1>
          <p>Novos artistas emergentes para você!</p>
        </div>
      </header>

      <div className="challenge-home-card">
        <a href="#">
          <div className="challenge-home-card-header">
            <img src="/assets/flame.svg" width="20" height="20" alt="flame" />
            <span>DESAFIO ATUAL</span>
          </div>

          <h3>{featuredChallenge.title}</h3>
          <p>{featuredChallenge.description}</p>

          <div className="challenge-home-card-progress-bar">
            <div className="challenge-home-card-progress-bar-bg">
              <div
                className="challenge-home-card-progress-bar-fg"
                style={{ width: `${featuredChallenge.progress}%` }}
              ></div>
            </div>
            <span className="challenge-home-card-progress-bar-text">
              {featuredChallenge.progressText}
            </span>
          </div>
        </a>
      </div>

      <section>
        <div className="carousel-header">
          <h2>Lançamentos atuais</h2>
          <a href="#">Ver todos</a>
        </div>
        <div className="carousel-body">
          {releases.map((item, index) => (
            <HomeCard item={item} key={index} />
          ))}
        </div>
      </section>

      <section>
        <div className="carousel-header">
          <h2>Artistas que combinam com você</h2>
          <a href="#">Ver todos</a>
        </div>
        <div className="carousel-body">
          {suggestedArtists.map((item, index) => (
            <HomeCard item={item} key={index} />
          ))}
        </div>
      </section>

      <br />
      <br />
      <br />
    </>
  );
};

export default Home;