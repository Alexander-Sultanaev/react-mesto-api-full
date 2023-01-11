import successIcon from '../images/iconSuccess.svg'
import unsuccessIcon from '../images/iconUnsuccess.svg'
const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img
          src={isSuccess ? successIcon : unsuccessIcon}
          alt={
            isSuccess ? 'Регистрация прошла успешно' : 'Регистрация не прошла'
          }
          className="popup__signup-icon"
        />
        <h3 className="popup__signup-title">
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h3>
        <button type="button" className="popup__button-close" onClick={onClose} />
      </div>
    </div>
  );
};

export default InfoTooltip;