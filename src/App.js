import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import MainContent from './components/mainContent';

function App() {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    getWatchListLocal();
  }, []);

  function getWatchListLocal() {
    if (localStorage.getItem('watchList') !== null) {
      setWatchList(JSON.parse(localStorage.getItem('watchList')));
    }
  }

  return (
    <div className="App">
      <Nav watchList={watchList} setWatchList={setWatchList} />
      <MainContent watchList={watchList} setWatchList={setWatchList} />\
    </div>
  );
}

export default App;
