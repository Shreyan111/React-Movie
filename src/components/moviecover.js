import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import WatchListBtn from './watchListBtn';
import Loader from './loader';
import API_KEY from '../config';
import MovieModal from './MovieModal';

function MovieCover({ watchList, setWatchList }) {
  const [moviesCover, setMoviesCover] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function openMovieModal(movie) {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }

  useEffect(() => {
    fetchMovies();
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  async function fetchMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`);
    const data = await response.json();
    setMoviesCover(data.results);
  }

  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => <ul>{dots}</ul>,
    customPaging: i => (
      <div className="custom-dot">
        <i className="fas fa-circle"></i>
      </div>
    ),
    responsive: [
      {
        breakpoint: 650,
        settings: {
          dots: false
        }
      }
    ],
  };

  return (
    <div >
      {
        loader ?
          <Loader />
          :
          <Slider {...settings}>
            {
              moviesCover.map(movie => (
                <div className="main-slider-cover" key={movie?.id}>
                  <div className="slider-cover" style={{ backgroundImage: `linear-gradient(to right, #29323c 0%, #4855630c 100%), url(http://image.tmdb.org/t/p/original/${movie?.backdrop_path})` }}>
                    <div className="slider-cover-detail">
                      <div className="atwl">
                        <CircularProgressbar
                          minValue="0"
                          maxValue="10"
                          value={movie?.vote_average}
                          text={movie?.vote_average === 0 ? "0" : movie?.vote_average}
                          styles={buildStyles({
                            strokeLinecap: 'round',
                            textSize: '30px',
                            pathColor: 'white',
                            textColor: 'white',
                            trailColor: '#485563',
                          })}
                        />
                      </div>
                      <div>
                        <h3>{movie?.title}<span className="original-title">{movie?.title !== movie?.original_title ? `( ${movie?.original_title} )` : ""}</span></h3>
                        <p className="release_date">{movie?.release_date}</p>
                        <button className='watch_buttons_cover' onClick={() => openMovieModal(movie)}>Watch now</button>
                        <p className="overview">{movie?.overview}</p>
                      </div>
                    </div>
                  </div >
                  <div className="wlbtn">
                    <WatchListBtn watchList={watchList} setWatchList={setWatchList} movie={movie} />
                  </div>
                </div>
              ))
            }
          </Slider >
      }
      {isModalOpen && selectedMovie && (
        <MovieModal
          movieId={selectedMovie?.id}
          onClose={() => {
            setSelectedMovie(null);
            setIsModalOpen(false);
          }}
        />
      )}
    </div >
  );
}

export default MovieCover;
