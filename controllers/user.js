const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require("email-validator");

const dotenv = require("dotenv").config();
if (dotenv.error) { throw dotenv.error};

const passwordValidator = require("password-validator");
const schema = new passwordValidator();
schema
.is().min(8)
.has().uppercase()
.has().digits()
.has().symbols();

const User = require('../models/user');


exports.signup = (req, res, next) => {
  if (!emailValidator.validate(req.body.email)) {
    throw new Error ('Adresse mail non valide !');
  } else if (!schema.validate(req.body.password)) {
    throw new Error ('Mot de passe de 8 caractères avec au moins 1 majuscule, 1 chiffre et 1 symbole.');
  } else {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User ({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.AUTH_TOKEN,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

