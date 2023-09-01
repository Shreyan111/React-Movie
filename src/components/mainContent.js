import React, { useState, useEffect } from 'react';
import MovieSlider from './movieSlider';
import Moviecover from './moviecover';
import MovieCatalogue from './movieCatalogue';
import API_KEY from '../config';

function MainContent({ watchList, setWatchList }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    setMovies(data.results);
  }

  return (
    <div>
      <Moviecover watchList={watchList} setWatchList={setWatchList} />
      <MovieSlider movies={movies} title="top rated movies" />
      <MovieCatalogue watchList={watchList} setWatchList={setWatchList} />
    </div>
  );
}

export default MainContent;
