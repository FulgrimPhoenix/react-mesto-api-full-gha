function Form (props){
  return (
    <form className="form popup__profile" onSubmit={props.submit} name={props.name} noValidate>
      {props.children}
      <button type="submit" className="form__submit form__submit_save-button">{props.submitButtonText}</button>
    </form>
  )
}

export default Form;