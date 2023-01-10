import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup =( {isOpen, onClose, onAddPlace } ) =>{
  const [link, setLink] = useState('');
  const [placeName, setPlaceName] = useState('');
  
  const handleLinkChange = (e) =>{
    setLink(e.target.value)
  }
  const handlePlaceNameChange = (e) =>{
    setPlaceName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      link: link,
      name: placeName,
    })
  }

  return(
    <PopupWithForm name = "card" title = "Новое место"
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
      buttonTitle = {"Создать"}
    >
        <fieldset className="popup__field">
          <input id="place-name" name="name" type="text" 
          className="popup__input popup__input_type_title" 
          placeholder="Название" required minLength="2" maxLength="30"
          value={placeName || ''}
          onChange={handlePlaceNameChange} />
          <span className="popup__input-error place-name-input-error" id="place-name-error"></span>
          <input id="place-link" name="link" type="url" 
          className="popup__input popup__input_type_link" 
          placeholder="Ссылка на картинку" required
          value={link || ''}
          onChange={handleLinkChange} />
          <span className="popup__input-error place-link-input-error" id="place-link-error"></span>
        </fieldset>
    </PopupWithForm>
  )
};

export default AddPlacePopup;