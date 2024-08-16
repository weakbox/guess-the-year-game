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
    <div className="app-container">
      <p className="text-center text-muted">In what year did the following happen?</p>
      <h2 id="question-text" className="text-center">{ question.text }</h2>
      <div className="xp-container">
        <h3>image_hint.jpg</h3>
        <div className="xp-img-container">
          <img id="question-img" src={ question.img }/>
        </div>
      </div>
      <div className="year-container text-center">
        <p className="text-bold text-center">Your Guess:</p>
        <input type="number" id="guess-year" value={ year } onChange={ changeYear } min={ yearMin } max={ yearMax }/>
      </div>
      <input id="guess-slider" type="range" value={ year } onChange={ changeYear } min={ yearMin } max={ yearMax }/>
      <button id="guess-button" onClick={ handleGuess }>Confirm</button>
    </div>
  );
}

export default App;
