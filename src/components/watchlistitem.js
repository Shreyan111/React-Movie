import React from 'react';

function WatchListItem({ watchList, setWatchList, height }) {
    function deleteFromWatchList(movie) {
        setWatchList(watchList?.filter((wl) => wl.movie.id !== movie.id));
    }

    return (
        <div className="list" style={{ maxHeight: `${height}px` }}>
            {
                watchList?.map((listItem) => (
                    <div key={listItem?.movie?.id} className="list-container">
                        <img src={`http://image.tmdb.org/t/p/w200/${listItem?.movie?.poster_path}`} alt={listItem?.movie?.title} />
                        <div className="item-detail">
                            <div className="item-text">
                                <span className="title">{listItem?.movie?.title}</span>
                            </div>
                            <div className="item-text">
                                <span className="info">
                                    <span>Popularity: </span>
                                    <span>{listItem?.movie?.popularity}</span>
                                </span>
                            </div>
                            <div className="item-text">
                                <span className="info">
                                    <span>Release Date:</span>
                                    <span>{listItem?.movie?.release_date}</span>
                                </span>
                            </div>
                        </div>
                        <i onClick={() => deleteFromWatchList(listItem?.movie)} className="fas fa-trash-alt trash"></i>
                        <div className="line"></div>
                    </div>
                ))
            }
        </div>
    );
}

export default WatchListItem;