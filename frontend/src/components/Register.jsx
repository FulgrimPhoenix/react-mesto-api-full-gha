import Header from "./Header";
import LogRegForm from "./LogRegForm";
import LogRegInput from "./LogRegInput";
import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.submit(email, password);
  }

  return (
    <>
      <Header>
        <Link to="/signin" className="header__button">
          {"Войти"}
        </Link>
      </Header>
      <LogRegForm
        title="Регистрация"
        submitButtonText="Зарегистрироваться"
        submit={handleSubmit}
      >
        <LogRegInput
          id="email"
          value={email}
          onChange={handleEmail}
          placeholder="Email"
          type="email"
        />
        <LogRegInput
          id="password"
          value={password}
          onChange={handlePassword}
          placeholder="Пароль"
          type="password"
        />
      </LogRegForm>
      <Link to="/signin" className="login-registration-form__back-to-login">
        Уже зарегистрированы? Войти
      </Link>
    </>
  );
}

export default Register;
