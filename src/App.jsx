import { useState } from 'react'
import './globals.scss';
import questions from './assets/video_games.json';
import XPCard from './components/XPCard';

// Sound imports:
import critical_stop from "/critical_stop.mp3";
import exclamation from "/exclamation.mp3";
import tada from "/tada.mp3";

const yearMin = 1924;
const yearMax = 2024;

// Prevents duplicate questions unless all questions have been exhausted.
// This function is kind of stupid and should be fixed, it is impure, so it bahves weirdly.
let seenQuestions = [];
const getRandomQuestion = () => {
  const availableQuestions = questions.filter(q => !seenQuestions.includes(q));

  if (availableQuestions.length === 0) {
    seenQuestions = []
    availableQuestions.push(...questions);
  }

  const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  seenQuestions.push(question);

  return question;
};

const evaluateGuess = (guess, year) => {
  const difference = Math.abs(parseInt(year) - guess);
  playSound(difference);
  return [`Your guess: ${guess}`, `Actual Year: ${year}`, `You were ${difference} years off.`];
};

const playSound = (difference) => {
  const sound = new Audio();
  sound.volume = 0.5;
  if (difference >= 10) sound.src = critical_stop;
  else if (difference >= 1) sound.src = exclamation;
  else sound.src = tada;
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
    showResult ? setQuestion(getRandomQuestion()) : null;
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
      {showResult && (
        <div className="result-container">
          <XPCard
            icon="./question_icon.png"
            title="Results!"
            bodyText={evaluateGuess(year, question.year).map((element, index) => (
              <p key={index}>{element}</p>
            ))}
          >
            <button onClick={handleGuess}>Go Back</button>
          </XPCard>
        </div>
      )}
    </div>
  );
}

export default App;
