import "../App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { ProtectedRouteElement } from "./ProtectedRouteElement";
import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import Form from "./Form.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import OK from "../images/status/OK.svg";
import FAIL from "../images/status/FAIL.svg";
import NotFoundPage from "./NotFoundPage";

function App() {
  const [isEditProfilePopupOpen, setProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddCardPopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
  const [statusOkPopupOpen, setStatusOkPopupOpen] = React.useState(false);
  const [statusFailPopupOpen, setStatusFailPopupOpen] = React.useState(false);
  const [selectedCard, setCardData] = React.useState({ src: "", title: "" });
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedInState] = React.useState(false);
  const [currentUser, setUserData] = React.useState({});
  const [currentUserEmail, setCurrentUserEmail] = React.useState('');
  const [currentUserId, setCurrentUserId] = React.useState('')

  const navigate = useNavigate();

  //загрузка исходной информации
  React.useEffect(() => {
    Promise.all([api.getMyUserInfo(localStorage.getItem('jwt')), api.getCardsInfo(localStorage.getItem('jwt')), api.checkToken(localStorage.getItem('jwt'))])
      .then(([userInfo, cardList, currentUser]) => {
        setUserData(userInfo);
        setCards(cardList);
        setCurrentUserEmail(currentUser.data.email);
        setCurrentUserId(currentUser.data._id);
      })
      .catch((err) => console.log(err));
  }, []);
  function handleOpenImagePopup({ name, link }) {
    setImagePopupState(true);
    setCardData({ src: link, title: name });
  }
  function handleOpenStatusOkPopup() {
    setStatusOkPopupOpen(true);
  }

  function handleSingUp(email, password) {
    api
      .registrate(email, password, localStorage.getItem('jwt'))
      .then(() => {
        handleOpenStatusOkPopup();
      })
      .catch((err) => {
        console.log(err);
        handleOpenStatusFailPopup();
      });
  }

  function deleteJwt() {
    localStorage.removeItem('jwt')
  }

  function handleSingIn(email, password) {
    api
      .login(email, password, localStorage.getItem('jwt'))
      .then((res) => {
        localStorage.setItem("jwt", `${res.token}`);
        handleAuthorization();
        navigate("/", { replace: true })
        api
          .checkToken(localStorage.getItem('jwt'))
          .then((res) => setCurrentUserEmail(res.data.email))
      })
      .catch((err) => {
        console.log(err);
        handleOpenStatusFailPopup();
      });
  }
  function handleAuthorization() {
    setLoggedInState(true);
  }
  function handleOpenStatusFailPopup() {
    setStatusFailPopupOpen(true);
  }
  function handleOpenProfilePopup() {
    setProfilePopupState(true);
  }
  function handleOpenAddCardPopup() {
    setAddCardPopupState(true);
  }
  function handleOpenAvatarPopup() {
    setAvatarPopupState(true);
  }
  //закрываем все модальные окна
  function closeAllPopups() {
    setCardData({ src: "", title: "" });
    setImagePopupState(false);
    setProfilePopupState(false);
    setAddCardPopupState(false);
    setAvatarPopupState(false);
    setStatusOkPopupOpen(false);
    setStatusFailPopupOpen(false);
  }
  //устанавливаем новый контекст и отправляем данные на сервер
  function handleUpdateUser(name, about) {
    api
      .editProfileInfo(name, about, localStorage.getItem('jwt'))
      .then((res) => {
        setUserData(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  //функционал обновления аватара
  function handleUpdateAvatar(link) {
    api
      .updateAvatar(link, localStorage.getItem('jwt'))
      .then((res) => {
        setUserData(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  //функционал карточек
  //удаление карточки
  function handleCardDelete(id) {
    api
      .deleteCard(id, localStorage.getItem('jwt'))
      .then(() => {
        setCards((cards) =>
          cards.filter((item) => {
            return item._id !== id;
          })
        );
      })
      .catch((err) => console.log(err));
  }
  //лайк карточки
  function handleLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    !isLiked
      ? api
        .likeThisCard(card._id, localStorage.getItem('jwt'))
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err))
      : api
        .unLikeThisCard(card._id, localStorage.getItem('jwt'))
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
  }
  //функция добавления карточки
  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link, localStorage.getItem('jwt'))
      .then((res) => setCards([res, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={<ProtectedRouteElement loggedIn={localStorage.getItem('jwt')} />}
          >
            <Route path="/" element={
              <div>
                <Header>
                  <Link to='signin' onClick={deleteJwt} className="header__button" replace>
                    {'Выйти'}
                  </Link>
                  <p className="header__email">{currentUserEmail}</p>
                </Header>
{                <Main
                  onCardDelete={handleCardDelete}
                  onCardLike={handleLike}
                  card={cards}
                  setCardData={handleOpenImagePopup}
                  onEditProfile={handleOpenProfilePopup}
                  onAddPlace={handleOpenAddCardPopup}
                  onEditAvatar={handleOpenAvatarPopup}
                />}
                <Footer />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
                <PopupWithForm
                  key={`deleteCard`}
                  name="delete-card"
                  title="Вы уверены?"
                  test={
                    <Form
                      key={`deleteCardPopup`}
                      name={`deleteCardPopup`}
                      submitButtonText="Да"
                    />
                  }
                />
                <ImagePopup
                  key={`ImagePopup`}
                  card={selectedCard}
                  isOpen={isImagePopupOpen}
                  onClose={closeAllPopups}
                />
              </div>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route
            path="/signin"
            element={
              <>
                <Login submit={handleSingIn} />
                <InfoTooltip
                  isOpen={statusOkPopupOpen}
                  onClose={closeAllPopups}
                  image={OK}
                  title="Вы успешно зарегистрировались!"
                  name="status-ok"
                />
                <InfoTooltip
                  isOpen={statusFailPopupOpen}
                  onClose={closeAllPopups}
                  image={FAIL}
                  title="Что-то пошло не так!
                  Попробуйте ещё раз."
                  name="status-fail"
                />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Register submit={handleSingUp} />
                <InfoTooltip
                  isOpen={statusOkPopupOpen}
                  onClose={closeAllPopups}
                  image={OK}
                  title="Вы успешно зарегистрировались!"
                  name="status-ok"
                />
                <InfoTooltip
                  isOpen={statusFailPopupOpen}
                  onClose={closeAllPopups}
                  image={FAIL}
                  title="Что-то пошло не так!
                            Попробуйте ещё раз."
                  name="status-fail"
                />
              </>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
