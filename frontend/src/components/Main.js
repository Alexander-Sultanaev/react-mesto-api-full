import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, cards , onCardClick, onCardLike, onCardDelete, setCardId }) => {

const currentUser = useContext(CurrentUserContext)
const {name, about, avatar} = currentUser;

  return (
    <>
    <main className="main">
      <section className="profile">
        <div className="profile__button-avatar" onClick={onEditAvatar}>
          <img src={avatar} alt="Аватар профиля" className="profile__image"/>
        </div>
        <div className="profile__content">
          <div className="profile__info">
            <div className="profile__wraper">
              <h1 className="profile__name">{name}</h1>
              <button type="button" className="profile__button-edit" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subname">{about}</p>
          </div>
          <button type="button" className="profile__button-add" onClick={onAddPlace}></button>
        </div>
      </section>

      <section className="gallery">
        <ul className="gallery__list">
        {cards.map((card) =>{
          return (
          <Card 
            key={card._id} 
            card = {card} 
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            />
          )
        })}
        </ul>
      </section>
    </main>
    </>
  )
}
export default Main;