import React, { useState } from 'react';
import Slider from "react-slick";
import MovieModal from './MovieModal';

function MovieSlider({ movies, title }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    function openMovieModal(movie) {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    }

    var settings = {
        arrows: false,
        infinite: true,
        autoplay: true,
        variableWidth: true,
        autoplaySpeed: 750,
        speed: 1000,
        slidesToScroll: 1,
    };

    return (
        <div className="topRated-slider">
            <h1 className="slider-title">{title}</h1>
            <Slider {...settings} >
                {
                    movies?.map(movie => (
                        <div className="slider-item">
                            <img src={`http://image.tmdb.org/t/p/w200/${movie?.poster_path}`} alt={movie?.title} />
                            <div className="item-detail">
                                <div className="item-vote">
                                    <p>{movie?.vote_average.toFixed(2)}</p>
                                </div>
                                <div className="item-desc">
                                    <h5>{movie?.title}</h5>
                                    <p>{movie?.overview}</p>
                                </div>
                                <button onClick={() => openMovieModal(movie)}>Watch now</button>
                            </div>
                        </div>
                    ))
                }
            </Slider>
            {isModalOpen && selectedMovie && (
                <MovieModal
                    movieId={selectedMovie?.id}
                    onClose={() => {
                        setSelectedMovie(null);
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

export default MovieSlider;