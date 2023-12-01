function ImagePopup(props) {
  return (
    <div
      className={`popup popup-picture ${props.isOpen ? "popup_opened" : ""}`}
      id="popup-picture"
    >
      <div className="popup-picture__container">
        <button
          type="button"
          className="popup__exit"
          onClick={props.onClose}
        ></button>
        <img
          className="popup-picture__photo"
          src={props.card.src}
          alt={props.card.title}
        />
        <h2 className="popup-picture__title">{props.card.title}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
