import Header from "./Header";
import LogRegForm from "./LogRegForm";
import LogRegInput from "./LogRegInput";
import React from "react";
import { Link } from "react-router-dom";

function Login(props) {
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
        <Link to="/signup" className="header__button">
          {"Регистрация"}
        </Link>
      </Header>
      <LogRegForm title="Вход" submitButtonText="Войти" submit={handleSubmit}>
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
    </>
  );
}

export default Login;
