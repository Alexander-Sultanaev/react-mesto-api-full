import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(registerData);
  };

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={registerData.email}
            onChange={handleChange}
            required
          />
          <input
            className="auth__input"
            id="password"
            name="password"
            type="password"
            minLength="8"
            placeholder="Пароль"
            autoComplete="password"
            value={registerData.password}
            onChange={handleChange}
            required
          />
          <button className="auth__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="auth__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
};

export default Register;