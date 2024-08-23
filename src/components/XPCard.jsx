import React from "react";
import './XPCard.scss';

function XPCard(props) {
  
  return (
    <div className="xp-container">
      <div className="xp-title-container">
        <img className="xp-icon" src={props.icon}/>
        <h5 className="xp-title">{props.title}</h5>
      </div>
      <div className="xp-body-container">
        {props.bodyText && <h2 id="question-text">{props.bodyText}</h2>}
        {props.hintImage && <img id="question-img" src={props.hintImage}/>}
        {props.children && props.children}
      </div>
    </div>
  );
}

export default XPCard;
