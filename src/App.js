import './App.css';
import Header from './components/Header';
import Quiz from './components/Quiz';
import Recommended from './components/Recommended';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Quiz />
      <Recommended />
    </div>
  );
}

export default App;
