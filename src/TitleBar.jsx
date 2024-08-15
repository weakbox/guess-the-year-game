import './TitleBar.scss'

function TitleBar({ text }) {
  return (
    <div className='title-container'>
      <i class="fa-solid fa-x"></i>
      <p>{ text }</p>
      <i class="fa-solid fa-check"></i>
    </div>
  )
}

export default TitleBar
