const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

const UserId = require('../models/userId');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const userId = new UserId ({
        email: req.body.email,
        password: hash
      });
      userId.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  UserId.findOne({ email: req.body.email })
    .then(userId => {
      if (!userId) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, userId.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userID: userId._id,
            token: jwt.sign(
              { userID: userId._id },
              'RANDOM_TOKEN_SO_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

