import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) =>{
  const avatarRef = React.useRef();
  
  function handleSubmit (e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }
  return(
    <PopupWithForm name = "avatar" title = "Обновить аватар" 
      isOpen = {isOpen} 
      onClose = {onClose}
      onSubmit = {handleSubmit}
      buttonTitle = {"Сохранить"}
    >
      <fieldset className="popup__field">
        <input id="avatar-link" name="avatar" type="url" 
        className="popup__input" placeholder="Ссылка на аватар" required
        ref={avatarRef}
        />
        <span className="popup__input-error" id="avatar-link-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;