import React from "react";

const PopupWithForm = (props) =>{
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
          <h3 className="popup__title">{props.title}</h3>
          <form name={`${props.name}`}
            className="popup__form" 
            noValidate
            onSubmit={props.onSubmit}>
              {props.children}
          <button type="submit" className="popup__button-save">{props.buttonTitle}</button>
          </form>
          <button type="button" className="popup__button-close" onClick = {props.onClose}></button>
        </div>
    </section>
  )
}

export default PopupWithForm;