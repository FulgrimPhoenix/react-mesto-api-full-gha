import Card from "./Card.js";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({onCardDelete, onCardLike, card, setCardData, onEditProfile, onAddPlace, onEditAvatar}) {
  const context = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__cage">
          <div className="profile__avatar-cage">
            <img
              className="profile__avatar"
              src={context.avatar}
              alt="аватарка"
              onClick={onEditAvatar}
              
            />
          </div>
          <div className="profile__cell">
            <h1 className="profile__name">{context.name}</h1>
            <p className="profile__info">{context.about}</p>
          </div>
          <button
            type="button"
            className="profile__button-image"
            onClick={onEditProfile}
            aria-label="кнопка редактирования профиля"
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button-image"
          onClick={onAddPlace}
          aria-label="кнопка добавления фотографии"
        ></button>
      </section>
      <section className="photo-section">
        <ul className="photo-grid">
          {card.map((el) => {
            return (
              <Card
                key={el._id}
                onCardClick={setCardData}
                card={el}
                handleLike={onCardLike}
                handleDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
