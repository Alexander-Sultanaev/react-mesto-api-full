import {useState} from "react";

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }
    onLogin(loginData);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          required
          value={loginData.email || ""}
          onChange={handleChange}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          required
          value={loginData.password || ""}
          onChange={handleChange}
        />
        <button className="auth__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;