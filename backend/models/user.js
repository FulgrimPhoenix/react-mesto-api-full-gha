const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { AuthError } = require("../errors/errors");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Жак-Ив Кусто",
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: "Исследователь",
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      validate: {
        validator(value) {
          return /^https?:\/\//.test(value);
        },
        message: "в данном поле должна быть ссылка",
      },
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

userSchema.statics.findUserByCredentials = async function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError("Неправильные почта или пароль"));
      }
      return bcryptjs.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError("Неправильные почта или пароль"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);


