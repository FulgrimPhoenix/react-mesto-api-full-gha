

function InfoTooltip({ onClose, isOpen, name, title, image }) {
  return (
    <div
      className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}
      id={`popup-${name}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__exit"
          onClick={onClose}
        ></button>
        <img className="popup__status-image" src={image} />
        {title ? <h2 className='popup__status-title'>{title}</h2> : <></>}
      </div>
    </div>
  );
}

export default InfoTooltip;
