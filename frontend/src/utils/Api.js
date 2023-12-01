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
      headers: this._auth,
    });
  }

  editProfileInfo(name, about) {
    return this._request(this._url + "users/me", {
      method: "PATCH",
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
      headers: this._auth
    })
  }

  likeThisCard(id) {
    return this._request(this._url + "cards/" + id + "/likes", {
      method: "PUT",
      headers: this._auth
    })
  }

  unLikeThisCard(id) {
    return this._request(this._url + "cards/" + id + "/likes", {
      method: "DELETE",
      headers: this._auth
    })
  }

  updateAvatar(link) {
    return this._request(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: this._auth,
      body: JSON.stringify({
        avatar: link,
      })
    })
  }

  registrate(email, password) {
    return this._request(this._authUrl + "signup", {
      method: "POST",
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      }
    })
  }
  register(email, password){
    return fetch(`https://auth.nomoreparties.co/signup`, {
      method: 'POST',
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
  baseUrl: "https://nomoreparties.co/v1/cohort-73/",
  authUrl: "https://auth.nomoreparties.co/",
  auth: {
    authorization: "aeff4cf2-7ae0-4790-a6f0-e4391c199a3c",
    "Content-Type": "application/json",
  },
});

export default api;
