import React, { useState, useEffect } from "react";
import "../../styles/home.css";

const Home = () => {
  const [releases, setReleases] = useState([]);
  const [suggestedArtists, setSuggestedArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);

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

  const fetchCityFromCoordinates = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      const address = data.address;

      if (address) {
        const cityName =
          address.city ||
          address.town ||
          address.village ||
          address.municipality ||
          address.county;

        const stateName = address.state || address.state_district;

        return `${cityName}`;
          }
    } catch (error) {
      console.error("Erro ao chamar API Nominatim:", error);
      return null;
    }
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 1. Busca a localização
      const userLocation = await fetchUserLocation();
      let cityName = null;

      if (userLocation) {
        cityName = await fetchCityFromCoordinates(
          userLocation.lat,
          userLocation.lon
        );
        setCity(cityName);
      }

      let artistsUrl = "http://localhost:8080/api/home/artists";

      if (cityName) {
        // Encode para garantir que espaços e acentos não quebrem a URL
        const encodedCity = encodeURIComponent(cityName);
        // Assumindo que o estado é o mesmo nome da cidade para teste ou ajustar lógica se tiver o estado separado
        artistsUrl += `?city=$SP`;
      }

      // 3. Faz as duas requisições ao Back-end em paralelo
      const [albumsResponse, artistsResponse] = await Promise.all([
        fetch("http://localhost:8080/api/home/albums"),
        fetch(artistsUrl),
      ]);

      if (!albumsResponse.ok || !artistsResponse.ok) {
        throw new Error("Falha na resposta da API");
      }

      // 4. Converte as respostas para JSON
      const releasesData = await albumsResponse.json();
      const artistsData = await artistsResponse.json();
console.log(artistsData)
      // 5. Atualiza o estado da tela
      setReleases(releasesData);
      setSuggestedArtists(artistsData);
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

  // Componente HomeCard ajustado para as propriedades da API (imageUrl e genre)
  const HomeCard = ({ item }) => (
    <div className="home-card">
      <a href="#">
        <div className="home-card-image">
          <img
            src={item.imageUrl} // Mudou de item.img para item.imageUrl
            alt={item.name}     // Mudou de item.title para item.name
            className="home-card-image-tag"
          />
        </div>
        <h4>{item.name}</h4>    {/* Mudou de item.title para item.name */}
        <p>{item.genre}</p>     {/* Mudou de item.subtitle para item.genre */}
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
          {releases.map((item) => (
            <HomeCard item={item} key={item.id} /> 
          ))}
        </div>
      </section>

      <section>
        <div className="carousel-header">
          <h2>Artistas que combinam com você {city ? `em ${city}` : ""}</h2>
          <a href="#">Ver todos</a>
        </div>
        <div className="carousel-body">
          {suggestedArtists.map((item) => (
            <HomeCard item={item} key={item.id} />
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