import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from "../context/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser  ] = React.useState({});
  const [cards, setCards] = React.useState([])

  React.useEffect(() =>{
    api.getUserInfo()
    .then((data) =>{
      setCurrentUser(data)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
  },[])

  React.useEffect(()=>{
    api.getInitialCards()
    .then((data) =>{
      setCards(data)
    })
    .catch((err) =>{
      console.log(`Ошибка: ${err}`)
    })
  },[])

  const handleEditProfileClick = () =>{setIsEditProfilePopupOpen(true)}
  const handleAddPlaceClick = () =>{setIsAddPlacePopupOpen(true)};
  const handleEditAvatarClick = () =>{setIsEditAvatarPopupOpen(true)};
  const handleCardClick = (card) =>{setSelectedCard(card)};
 
  const closeAllPopups = () =>{
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  const handleUpdateUser = (newUserInfo) =>{
    api.setUserInfo(newUserInfo)
    .then((data) =>{
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch((err) =>{
      console.log(`Ошибка: ${err}`)
    })
  };
  
  const handleUpdateAvatar = (data) =>{
    api.editUserAvatar(data)
    .then((data) =>{
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch((err) =>{
      console.log(`Ошибка: ${err}`)
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) =>{
      console.log(`Ошибка: ${err}`)
    })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) =>{
      console.log(`Ошибка: ${err}`)
    })
  }

  function handleAddPlaceSubmit(data){
    api.addCar(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) =>{
      console.log(`Ошибка: ${err}`)
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar ={handleEditAvatarClick}
        onCardClick = {handleCardClick}
        cards = {cards}
        onCardLike = {handleCardLike}
        onCardDelete = {handleCardDelete}
      />
      <Footer />
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ImagePopup 
        card = {selectedCard}
       onClose = {closeAllPopups}/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
