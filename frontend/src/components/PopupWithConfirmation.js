const PopupWithConfirmation = ({ isOpen, onClose, onLoading, card, onSubmit }) => {
  const handleConfirmiation = (event) => {
    event.preventDefault();
    onSubmit(card);
  };
  return (
    <div className={`popup popup_type_delete-card ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h3 className="popup__title">Вы уверены?</h3>
        <form
          name="delete-form"
          action="#"
          className="popup__form form"
          onSubmit={handleConfirmiation}
        >
          <button type="submit" className="popup__button-save">
            {onLoading ? "Сохранение..." : "Да"}
          </button> 
        </form>
        <button type="button" className="popup__button-close" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default PopupWithConfirmation;