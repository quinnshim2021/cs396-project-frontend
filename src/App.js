import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Quiz from './components/Quiz';
import Recommended from './components/Recommended';

const App = () => {
  const [anime, setAnime] = useState([]);

  return (
    <div className="App">
      <Header />
      <Quiz handler={(res) => setAnime(anime.concat(res))} />
      <Recommended anime={anime} />
    </div>
  );
}

export default App;
