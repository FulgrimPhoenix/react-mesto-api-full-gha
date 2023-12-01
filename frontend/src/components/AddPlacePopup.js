import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import React from "react";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, onChange, setValues } =  useForm([]);

  React.useEffect(() => {
    setValues([])
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values['field-title'], values["field-url"]);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="add-card"
      title="Новое место"
      submit={handleSubmit}
      submitButtonText={"Создать"}
    >
      <Input
        key={"field-title"}
        id="field-title"
        value={values['field-title']}
        getValue={onChange}
        placeholder="Название"
      />
        <Input
        key={"field-url"}
        id="field-url"
        value={values["field-url"]}
        getValue={onChange}
        placeholder="Ссылка на картинку"
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
