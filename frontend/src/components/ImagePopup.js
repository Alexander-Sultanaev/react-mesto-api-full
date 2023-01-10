import React from "react";

const ImagePopup = (props) =>{
  return(
    <section className = {`popup popup_type_image ${props.card.link ? "popup_opened" : ""}`}>
      <div className="popup__wraper">
        <img src={props.card.link} alt={props.card.name} className="popup__image"/>
        <h2 className="popup__caption">{props.card.name}</h2>
        <button type="button" className="popup__button-close" onClick={props.onClose}></button>
      </div>
    </section>
  )
}

export default ImagePopup;