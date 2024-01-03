
class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
    this._status = false;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    localStorage.removeItem('jwt');
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(this._checkResponse.bind(api));
  }

  getCardsInfo() {
    return this._request(this._url + "cards", {
      headers: this._headers,
      credentials: "include",
    });
  }

  getMyUserInfo() {
    return this._request(this._url + "users/me", {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    });
  }

  editProfileInfo(name, about) {
    return this._request(this._url + "users/me", {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addNewCard(name, link) {
    return this._request(this._url + "cards", {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(id) {
    return this._request(this._url + "cards/" + id, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    });
  }

  likeThisCard(id) {
    return this._request(this._url + "cards/" + id + "/likes", {
      method: "PUT",
      credentials: "include",
      headers: this._headers,
    });
  }

  unLikeThisCard(id) {
    return this._request(this._url + "cards/" + id + "/likes", {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    });
  }

  updateAvatar(link) {
    return this._request(this._url + "users/me/avatar", {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  registrate(email, password) {
    return fetch(this._url + "signup", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      }),
    });
  }

  login(email, password) {

    return fetch(this._url + "signin", {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      }),
    })
      .catch((err) => console.log(`ошибка логина ${err}`));
  }
  checkCurrentUser() {
    return fetch(this._url + "users/me", {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then((res) => console.log(res));
  }

  checkToken() {
    return this._request(this._url + "users/me", {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
