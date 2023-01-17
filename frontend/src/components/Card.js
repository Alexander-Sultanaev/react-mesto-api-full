import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";


const Card = ({card, onCardClick, onCardLike, onCardDelete}) =>{
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id; 
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = 
    `gallery__button-delete ${isOwn ? 'gallery__button-delete_visible' : ""}`;
  const cardLikeButtonClassName = 
    `gallery__button-like ${isLiked ? 'gallery__button-like_active' : ""}`;

  function handleClick() {
    onCardClick(card);
  };

  function handleCardLike() {
    onCardLike(card)
  };

  function handleDeleteClick(){
    onCardDelete(card._id)
  }
  
  return (
    <div className="gallery__card">
      <img 
      src={card.link}
      alt={card.name} 
      onClick={handleClick} 
      className="gallery__image"
      />
      <button 
      type="button" 
      className={cardDeleteButtonClassName}
      onClick={handleDeleteClick}
      />
      <div className="gallery__wraper">
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__container">
          <button 
          type="button" 
          className={cardLikeButtonClassName} 
          onClick={handleCardLike}
          aria-label="Like"
          />
          <span className="gallery__heart-count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;