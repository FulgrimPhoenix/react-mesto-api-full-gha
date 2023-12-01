import React from "react";

function Input(
  { id, value, getValue, placeholder}
) {
  return (
    <>
      <input
        type="text"
        name={id}
        value={value || ''}
        onChange={getValue}
        className={`form__input form__input_${id} popup__input`}
        placeholder={placeholder}
        required
        minLength="2"
      />
      <span className={`form__input-error ${id}-error`}></span>
    </>
  );
};

export default Input;
