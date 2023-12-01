import React from "react";
import { useState } from "react";

const useForm = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  return {
    values,
    onChange: (event) => {
      const { value, name } = event.target;
      setValues({...values, [name]: value });
    },
    setValues
  };
}

export default useForm;
