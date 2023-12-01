export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

export class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

export class userAlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

export class accessError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}