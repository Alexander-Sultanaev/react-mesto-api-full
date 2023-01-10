import React, { useContext } from "react";
//import api from "../utils/api.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

const Main = (props) => {

const currentUser = useContext(CurrentUserContext)
const {name, about, avatar} = currentUser;




  return (
    <>
    <main className="main">
      <section className="profile">
        <div className="profile__button-avatar" onClick={props.onEditAvatar}>
          <img src={avatar} alt="Аватар профиля" className="profile__image"/>
        </div>
        <div className="profile__content">
          <div className="profile__info">
            <div className="profile__wraper">
              <h1 className="profile__name">{name}</h1>
              <button type="button" className="profile__button-edit" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__subname">{about}</p>
          </div>
          <button type="button" className="profile__button-add" onClick={props.onAddPlace}></button>
        </div>
      </section>

      <section className="gallery">
        <ul className="gallery__list">
        {props.cards.map((card) =>{
          return (
          <Card 
            key={card._id} 
            card = {card} 
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
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