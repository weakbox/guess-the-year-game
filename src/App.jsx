import { useState } from 'react'
import './globals.scss';
import questions from './assets/video_games.json';
import XPCard from './components/XPCard';

const yearMin = 1924;
const yearMax = 2024;

const getRandomQuestion = () => {
  return questions[Math.floor(Math.random() * questions.length)];
};

const evaluateGuess = (guess, year) => {
  const difference = Math.abs(parseInt(year) - guess);
  // playSound(difference);
  return [`Your guess: ${guess}`, `Actual Year: ${year}`, `You were ${difference} years off.`];
};

const playSound = (difference) => {
  const sound = new Audio();
  if (difference >= 10) sound.src = `https://www.101soundboards.com/sounds/14500-critical-stop`;
  else if (difference >= 1) sound.src = `https://www.101soundboards.com/sounds/14504-exclamation`;
  else sound.src = `https://www.101soundboards.com/sounds/14523-tada`;
  sound.play();
};

const trimImageLink = (link) => {
  const truncatedString = link.substring(1 + link.lastIndexOf("/"));
  return truncatedString.length < 40 
    ? truncatedString 
    : truncatedString.substring(0, 40) + "...";
};

function App() {
  const [question, setQuestion] = useState(getRandomQuestion());
  const [year, setYear] = useState(yearMax);
  const [showResult, setShowResult] = useState(false);

  const changeYear = (event) => {
    setYear(event.target.value);
  };

  const handleGuess = () => {
    setShowResult(!showResult);
    showResult ? setQuestion(getRandomQuestion()) : null ;
  };

  return (
    <div className="app-container">
      <div className="xp-taskbar">
        <a href="https://github.com/weakbox/guess-the-year-game" target="_blank">
          <span className="program">
            <i className="fa-brands fa-square-github"></i>
            GitHub
          </span>
        </a>
        <a href="https://github.com/weakbox/guess-the-year-game" target="_blank">
          <span className="program">
            <i className="fa-brands fa-linkedin"></i>
            LinkedIn
          </span>
        </a>
      </div>
      <XPCard
        icon="./question_icon.png"
        title="In what year did the following happen?"
        bodyText={question.text}
      />
      <XPCard
        icon="./image_icon.png"
        title={trimImageLink(question.img)}
        hintImage={question.img}
      />
      <XPCard
        icon="./guess_icon.png"
        title="What is your guess?"
      >
        <input type="number" id="guess-year" value={ year } onChange={ changeYear } min={ yearMin } max={ yearMax }/>
        <input id="guess-slider" type="range" value={ year } onChange={ changeYear } min={ yearMin } max={ yearMax }/>
        <button id="guess-button" onClick={ handleGuess }>Confirm Guess</button>
      </XPCard>
      {showResult && <div className="result-container"><XPCard icon="./question_icon.png" title="Results!" bodyText={evaluateGuess(year, question.year).map(element => <p>{element}</p>)}><button onClick={handleGuess}>Go Back</button></XPCard></div>}
    </div>
  );
}

export default App;
