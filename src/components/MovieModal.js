import React, { useState, useEffect } from 'react';
import API_KEY from '../config';

function MovieModal({ movieId, onClose }) {
    const [movie, setMovie] = useState({
        genres: [],
    });
    const [movieTrailer, setMovieTrailer] = useState({});
    const [movieVideos, setMovieVideos] = useState([]);
    const [actors, setActors] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [url, setUrl] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        fetchMovies();
        fetchMovieTrailer();
        fetchActors();
        fetchSimilarMovies();
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1000);

    }, [movieId]);

    async function fetchMovies() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
        const data = await response.json();

        setMovie(data);
    }

    async function fetchMovieTrailer() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
        const data = await response.json();

        const trailer = data.results.find((video) => video.type === "Trailer");

        setMovieVideos(data.results);
        setUrl(trailer ? trailer.key : "");
        setMovieTrailer(trailer);
    }

    async function fetchActors() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
        const data = await response.json();

        setActors(data.cast.slice(0, 6));
    }

    async function fetchSimilarMovies() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`);
        const data = await response.json();

        setSimilarMovies(data?.results);
    }

    function handleUrlUpdate(e, videoKey) {
        setUrl(videoKey);
    }

    return (
        <div className="movie-detail-modal">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-content">
                <div className="movie-detail-actions">
                    <div className="close-modal" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </div>
                </div>
                <div className="movie-content">
                    <div className="movie-image">
                        <img src={`http://image.tmdb.org/t/p/w185/${movie?.poster_path}`} alt={movie?.title} />
                    </div>
                    <div className="movie-info">
                        <h2>{movie?.title}</h2>
                        <p>{movie?.overview}</p>
                        {/* Add more movie details here */}
                    </div>
                </div>
                <div className="actors">
                    <h3>Actors</h3>
                    <div className="actor-list">
                        {actors?.map(actor => (
                            <div key={actor?.id} className="actor">
                                <img src={`http://image.tmdb.org/t/p/w185/${actor?.profile_path}`} alt={actor?.name} />
                                <p>{actor?.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Add other sections like movie trailer and similar movies */}
            </div>
        </div>
    );
}

export default MovieModal;
