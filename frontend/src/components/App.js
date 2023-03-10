import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from './PopupWithConfirmation';

import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

import api from "../utils/api.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);

  const [authorizationEmail, setAuthorizationEmail] = useState('');

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [removedCardId, setRemovedCardId] = useState('');

  const history = useHistory();

  useEffect(() => {
    handleTokenCheck()
  }, [history])

  const openEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const openEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const openAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const openInfoTooltip = () => {
    setIsInfoTooltipOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const jwt = localStorage.getItem('jwt');
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`????????????: ${err}`);
      });
  }

  const handleCardDeleteClick = (cardId) => {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    setRemovedCardId(cardId);
  };

  function handleCardDelete(cardId) {
    const jwt = localStorage.getItem('jwt');
    api
      .deleteCard(cardId, jwt)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`????????????: ${err}`);
      });
  }

  const handleUpdateUser = (newUserInfo) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    api
      .setUserInfo(newUserInfo, jwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`????????????: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (newData) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    api
      .setUserAvatar(newData, jwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`????????????: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = ({name, link}) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    api
      .addCard({name: name, link: link}, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`????????????: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  // ?????????????????????? ?? ?????????????????????? ??????????????
  const handleRegistration = (data) => {
    return auth
      .register(data)
      .then(() => {
        setIsRegistrationSuccessful(true);
        openInfoTooltip();
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccessful(false);
        openInfoTooltip();
      });
  };

  const handleAuthorization = (data) => {
    return auth
      .authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        handleTokenCheck();
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltip();
      });
  };

  // ??????????
  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setIsLoggedIn(false);
    setCurrentUser({});
    setAuthorizationEmail('');
  };

  // ???????????????? ????????????
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((data) => {
        setAuthorizationEmail(data.email);
        setCurrentUser(data)
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err));
    api
      .getInitialCards(jwt)
      .then((initialCards) => {
        setCards(initialCards)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={isLoggedIn}
          userEmail={authorizationEmail}
          onSignOut={handleSignOut}
        />
        <Switch>
          <Route exact path="/sign-in">
            <Login onLogin={handleAuthorization} />
          </Route>
          <Route exact path="/sign-up">
            <Register onRegister={handleRegistration} />
          </Route>
          <ProtectedRoute
            exact path="/"
            loggedIn={isLoggedIn}
            component={Main}
            onEditProfile={openEditProfileClick}
            onAddPlace={openAddPlaceClick}
            onEditAvatar={openEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />
          <PopupWithConfirmation
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onLoading={isLoading}
          onSubmit={handleCardDelete}
          card={removedCardId}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegistrationSuccessful}
        />
        <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;