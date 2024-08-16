import { useState } from 'react'
import './globals.scss';
import questions from './assets/questions.json';

const getRandomQuestion = () => {
  return questions[Math.floor(Math.random() * questions.length)];
};

function App() {
  const [question, setQuestion] = useState(getRandomQuestion());

  const changeQuestion = () => {
    setQuestion(getRandomQuestion());
  };

  return (
    <div className="app-container">
      <p className="text-center text-muted">In what year did the following happen?</p>
      <h2 id="question-text" className="text-center">{ question.text }</h2>
      <img id="question-img" src={ question.img }/>
      <p className="text-bold">Guess</p>
      <p id="guess-year">2024</p>
      <input id="guess-slider" type="range" min="1924" max="2024"></input>
      <button id="guess-button" onClick={ changeQuestion }>Confirm</button>
    </div>
  );
}

export default App;
