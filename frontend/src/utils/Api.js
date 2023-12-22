class Api {
  constructor({ baseUrl, authUrl, auth }) {
    this._url = baseUrl;
    this._authUrl = authUrl;
    this._auth = auth;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(this._checkResponse);
  }

  getCardsInfo() {
    return this._request(this._url + "cards", { headers: this._auth });
  }

  getMyUserInfo() {
    return this._request(this._url + "users/me", {
      method: "GET",
      credentials: 'include',
      headers: this._auth,
    });
  }

  editProfileInfo(name, about) {
    return this._request(this._url + "users/me", {
      method: "PATCH",
      credentials: 'include',
      headers: this._auth,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
  }

  addNewCard(name, link) {
    return this._request(this._url + "cards", {
      method: "POST",
      credentials: 'include',
      headers: this._auth,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
  }

  deleteCard(id) {
    return this._request(this._url + "cards/" + id, {
      method: "DELETE",
      credentials: 'include',
      headers: this._auth
    })
  }

  likeThisCard(id) {
    return this._request(this._url + "cards/" + id + "/likes", {
      method: "PUT",
      credentials: 'include',
      headers: this._auth
    })
  }

  unLikeThisCard(id) {
    return this._request(this._url + "cards/" + id + "/likes", {
      method: "DELETE",
      credentials: 'include',
      headers: this._auth
    })
  }

  updateAvatar(link) {
    return this._request(this._url + "users/me/avatar", {
      method: "PATCH",
      credentials: 'include',
      headers: this._auth,
      body: JSON.stringify({
        avatar: link,
      })
    })
  }

  registrate(email, password) {
    return this._request(this._authUrl + "signup", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      })
    })
  }

  login(email, password) {
    return this._request(this._authUrl + "signin", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      })
    })
  }
  checkToken(JWT) {
    return this._request(this._authUrl + "users/me", {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      }
    })
  }
  register(email, password){
    return fetch(`https://auth.nomoreparties.co/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": `${password}`,
        "email": `${email}`
      })
    })
    .then(this._checkResponse)
    .then((res) => console.log(res))
  }
  singin(email, password){
    return fetch(`https://auth.nomoreparties.co/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": `${password}`,
        "email": `${email}`
      })
    })
    .then(this._checkResponse)
    .then((res) => console.log(res))
  }
}

const api = new Api({
  baseUrl: "https://garazhelka.nomoredomainsmonster.ru/",
  authUrl: "https://garazhelka.nomoredomainsmonster.ru/",
  auth: {
    authorization: "aeff4cf2-7ae0-4790-a6f0-e4391c199a3c",
    "Content-Type": "application/json",
  },
});

export default api;
