import { useState } from 'react'
import './globals.scss';
import questions from './assets/questions.json';

const yearMin = 1924;
const yearMax = 2024;

const getRandomQuestion = () => {
  return questions[Math.floor(Math.random() * questions.length)];
};

const evaluateGuess = (guess, year) => {
  const difference = Math.abs(parseInt(year) - guess);
  return `Your guess: ${guess}\nActual Year: ${year}\nYou were ${difference} years off.`;
};

const trimImageLink = (link) => {
  const truncatedString = link.substring(1 + link.lastIndexOf("/"));
  return truncatedString.length < 45 
    ? truncatedString 
    : truncatedString.substring(0, 40) + "...";
};

function App() {
  const [question, setQuestion] = useState(getRandomQuestion());
  const [year, setYear] = useState(yearMax);

  const changeYear = (event) => {
    setYear(event.target.value);
  };

  const handleGuess = () => {
    alert(evaluateGuess(year, question.year));
    setQuestion(getRandomQuestion());
  };

  return (
    <div className="app-container" style={{ backgroundImage: `url("./bg_bliss.png")`, backgroundSize: "cover"}}>

      <div className="xp-container">
        <div className="xp-title-container">
          <img className="xp-icon" src="./question_icon.png"/>
          <h5 className="xp-title">In what year did the following happen?</h5>
        </div>
        <div className="xp-body-container">
          <h2 id="question-text">{ question.text }</h2>
        </div>
      </div>
      <div className="xp-container">
        <div className="xp-title-container">
          <img className="xp-icon" src="./image_icon.png"/>
          <h5 className="xp-title">{ trimImageLink(question.img) }</h5>
        </div>
        <div className="xp-body-container">
          <img id="question-img" src={ question.img }/>
        </div>
      </div>
      <div className="xp-container">
        <div className="xp-title-container">
          <img className="xp-icon" src="./guess_icon.png"/>
          <h5 className="xp-title">What is your guess?</h5>
        </div>
        <div className="xp-body-container">
          <input type="number" id="guess-year" value={ year } onChange={ changeYear } min={ yearMin } max={ yearMax }/>
          <input id="guess-slider" type="range" value={ year } onChange={ changeYear } min={ yearMin } max={ yearMax }/>
          <button id="guess-button" onClick={ handleGuess }>Confirm Guess</button>
        </div>
      </div>
    </div>
  );
}

export default App;
