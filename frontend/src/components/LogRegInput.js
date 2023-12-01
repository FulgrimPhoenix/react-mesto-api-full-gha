function LogRegInput({ id, value, onChange, placeholder, type }) {
  return (
    <>
      <input
        type={type}
        id={id}
        value={value || ""}
        onChange={onChange}
        className={`login-registration-form__input`}
        placeholder={placeholder}
        required
        minLength="2"
      />
    </>
  );
}

export default LogRegInput;