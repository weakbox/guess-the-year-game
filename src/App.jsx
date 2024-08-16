import './globals.scss'

function App() {
  return (
    <div className="app-container">
      <p className="text-center text-muted">In what year did the following happen?</p>
      <h2 id="question-text" className="text-center">The CN Tower is opened for the first time.</h2>
      <img id="question-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Toronto_-_ON_-_Toronto_Harbourfront7.jpg/375px-Toronto_-_ON_-_Toronto_Harbourfront7.jpg" alt="The CN Tower" />
      <p className="text-bold">Guess</p>
      <p id="guess-year">2024</p>
      <input id="guess-slider" type="range" min="1924" max="2024"></input>
      <button id="guess-button">Confirm</button>
    </div>
  )
}

export default App
