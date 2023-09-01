import React, { useState, useEffect } from 'react';
import API_KEY from '../config';
import MovieModal from './MovieModal';

function Form({ setYear, setCategory, setSelectedGenre }) {
    const [movieSearch, setMovieSearch] = useState([]);
    const [query, setQuery] = useState("");
    const [yearArray, setYearArray] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    function openMovieModal(movie) {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    }

    useEffect(() => {
        addYears();
        fetchGenres();
    }, []);

    useEffect(() => {
        if (query.length >= 2) {
            getMoviesByQuery();
        } else {
            setMovieSearch([]);
        }
    }, [query]);

    async function fetchGenres() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
            const data = await response.json();
            setGenres(data?.genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    }

    async function getMoviesByQuery() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
            const data = await response.json();
            setMovieSearch(data?.results || []);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    function updateQuery(e) {
        setQuery(e.target.value);
    }

    function addYears() {
        const thisYear = new Date().getFullYear();
        const years = Array.from({ length: thisYear - 1999 }, (_, index) => thisYear - index);
        setYearArray(years);
    }

    return (
        <div className="search">
            <div className="search-bar">
                <input type="text" id="search" value={query} onChange={updateQuery} />
                <i className="fas fa-search"></i>
                <div className="search-list">
                    {movieSearch?.map(movie => (
                        <div key={movie?.id} className="search-item">
                            <img src={`http://image.tmdb.org/t/p/w200/${movie?.poster_path}`} alt={movie?.title} />
                            <div className="search-detail">
                                <p className="title">{movie?.title}</p>
                                <button className='watch_buttons_search' onClick={() => openMovieModal(movie)}>Watch now</button>
                            </div>
                        </div>
                    ))}
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
            </div>

            <div className="search-select">
                <div className="select">
                    <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="popular">Popular</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="top_rated">Top Rated</option>
                        <option value="now_playing">Now Playing</option>
                    </select>
                    <i className="fas fa-box"></i>
                </div>

                <div className="select">
                    <select onChange={(e) => setYear(e.target.value === "All" ? null : e.target.value)}>
                        <option>Select Year</option>
                        <option value="All">All</option>
                        {yearArray?.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <i className="fas fa-calendar-day"></i>
                </div>

                <div className="select">
                    <select onChange={(e) => setSelectedGenre(e.target.value)}>
                        <option value="">All Genres</option>
                        {genres?.map(genre => (
                            <option key={genre?.id} value={genre?.id}>
                                {genre?.name}
                            </option>
                        ))}
                    </select>
                    <i className="fas fa-tag"></i>
                </div>
            </div>
        </div>
    );
}

export default Form;
