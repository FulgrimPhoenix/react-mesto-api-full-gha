class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class userAlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class accessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = {
  NotFoundError,
  BadRequest,
  AuthError,
  userAlreadyExists,
  accessError,
}