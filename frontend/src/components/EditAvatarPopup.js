import React, { createRef } from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = useRef();

  React.useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(ref.current.value);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="avatar"
      title="Обновить аватар"
      submit={handleSubmit}
      submitButtonText={"Сохранить"}
    >
      <input
        type="text"
        ref={ref}
        id="field-url-avatar"
        className={`form__input form__input_field-url-avatar popup__input`}
        placeholder="Ссылка на картинку"
        required
        minLength="2"
      />
      <span className={`form__input-error field-url-avatar-error`}></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
