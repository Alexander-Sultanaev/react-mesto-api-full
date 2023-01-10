import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";


const Card = (props) =>{
  const currentUser = useContext(CurrentUserContext)
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = 
    `gallery__button-delete ${isOwn ? 'gallery__button-delete_visible' : ""}`;
  const cardLikeButtonClassName = 
    `gallery__button-like ${isLiked ? 'gallery__button-like_active' : ""}`;

  function handleClick() {
    props.onCardClick(props.card);
  };

  function handleCardLike() {
    props.onCardLike(props.card)
  };

  function handleDeleteClick(){
    props.onCardDelete(props.card)
  }
  
  return (
    <li className="gallery__card">
      <img src={props.card.link}
      alt={props.card.name} 
      onClick={handleClick} 
      className="gallery__image"
      />
      <button type="button" 
      className={cardDeleteButtonClassName}
      onClick={handleDeleteClick}
      />
      <div className="gallery__wraper">
        <h2 className="gallery__title">{props.card.name}</h2>
        <div className="gallery__container">
          <button type="button" 
          className={cardLikeButtonClassName} 
          onClick={handleCardLike}
          />
          <span className="gallery__heart-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;