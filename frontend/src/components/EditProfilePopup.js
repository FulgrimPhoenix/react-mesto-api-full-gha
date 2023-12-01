import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const context = React.useContext(CurrentUserContext);

  const { values, onChange, setValues } =  useForm({['field-name']: context.name, ['field-speciality']: context.about});

  React.useEffect(() => {
    setValues({['field-name']: context.name, ['field-speciality']: context.about});
  }, [context, isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values['field-name'], values['field-speciality']);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="profile"
      title="Редактировать профиль"
      submit={handleSubmit}
      submitButtonText={"Сохранить"}
    >
      <Input
        key={"field-name"}
        value={values['field-name']}
        getValue={onChange}
        id="field-name"
        placeholder="Введите имя"
      />
      <Input
        key={"field-speciality"}
        value={values['field-speciality']}
        getValue={onChange}
        id="field-speciality"
        placeholder="Введите специальность"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
