import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup=({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const handleNameChange = (e) =>{
    setName(e.target.value);
  }
  const handleDescriptionChange = (e) =>{
    setDescription(e.target.value);
  }
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm name = "profile" title = "Редактировать профиль"
      isOpen = {isOpen} 
      onClose = {onClose}
      onSubmit = {handleSubmit}
      buttonTitle = {"Сохранить"}
    >
      <fieldset className="popup__field">
        <input id="name-input" name="name" type="text"
          className="popup__input popup__input_type_name" 
          placeholder="Имя" required minLength="2" maxLength="40"
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="popup__input-error" id="name-input-error"></span>
        <input id="subname-input" name="about" type="text" 
          className="popup__input popup__input_type_subname" 
          placeholder="Занятие" required minLength="2" maxLength="200"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error" id="subname-input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;