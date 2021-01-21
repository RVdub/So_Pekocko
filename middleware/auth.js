const jwt = require('jsonwebtoken');

const dotenv = require("dotenv").config();
if (dotenv.error) { throw dotenv.error };


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'ID utilisateur non valide !';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requête non valide !')
        });
    }
};
