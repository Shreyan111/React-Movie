import React, { useState, useEffect, useRef } from 'react';
import Form from './form';
import Paginate from 'react-paginate';
import WatchListBtn from './watchListBtn';
import API_KEY from '../config';
import MovieModal from './MovieModal';

function MovieCatalogue({ watchList, setWatchList }) {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [allPages, setAllPages] = useState(null);
    const [year, setYear] = useState(null);
    const [category, setCategory] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const isMounted = useRef(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    function openMovieModal(movie) {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    }

    useEffect(() => {
        fetchMovies();
    }, [page, year, selectedGenre]);

    useEffect(() => {
        if (isMounted.current) {
            fetchMoviesByCategory();
        } else {
            isMounted.current = true;
        }
    }, [category]);

    async function fetchMovies() {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&primary_release_year=${year}`;
        if (selectedGenre) {
            url += `&with_genres=${selectedGenre}`;
        }
        const response = await fetch(url);
        const data = await response.json();

        setMovies(data?.results);
        setAllPages(data?.total_pages);
    }

    async function fetchMoviesByCategory() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();

        setMovies(data.results);
        setAllPages(data.total_pages);
    }

    function handlePageChange(page) {
        setPage(page.selected + 1);
    }

    return (
        <div className="catalogue">
            <Form setYear={setYear} setCategory={setCategory} setSelectedGenre={setSelectedGenre} />
            <div className="catalogue-list">
                {movies?.map(movie => (
                    <div key={movie?.id} className="catalogue-item">
                        <img src={`http://image.tmdb.org/t/p/w200/${movie?.poster_path}`} alt={movie?.title} />
                        <div className="catalogue-item-detail">
                            <span className="title">{movie?.title}</span>
                            <span className="overview">{movie?.overview.substring(0, 100)}</span>
                            <button onClick={() => openMovieModal(movie)}>Watch now</button>
                        </div>
                        <div className="heart">
                            <WatchListBtn watchList={watchList} setWatchList={setWatchList} movie={movie} />
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedMovie && (
                <MovieModal
                    movieId={selectedMovie?.id}
                    onClose={() => {
                        setSelectedMovie(null);
                        setIsModalOpen(false);
                    }}
                />
            )}

            <Paginate
                pageCount={allPages}
                initialPage={0}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                previousLabel={<i className="fas fa-angle-left"></i>}
                nextLabel={<i className="fas fa-angle-right"></i>}
                containerClassName={'paginate-container'}
                pageClassName={'paginate-item'}
                activeClassName={'paginate-active-item'}
                previousClassName={'paginate-previous'}
                nextClassName={'paginate-next'}
                disabledClassName={'paginate-disabled'}
                breakClassName={'paginate-break'}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default MovieCatalogue;