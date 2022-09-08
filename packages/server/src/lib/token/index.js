<<<<<<< HEAD
const jwt = require("jsonwebtoken")
const secret_jwt= "FINPRO"

//bikin token
const createToken = (payload) => jwt.sign(payload, secret_jwt)
// checking token dari mana
const verifyToken =(token) => jwt.verify(token,secret_jwt)

module.exports = {createToken,verifyToken}
=======
const jsonToken = require('jsonwebtoken');
const secretWord = 'ehe_ehe';

const createToken = (payload) => jsonToken.sign(payload, secretWord);
const verifyToken = (token) => jsonToken.verify(token, secretWord);

module.exports = { createToken, verifyToken };
>>>>>>> 56e23774636431cdddb6b69487b68208f7ef6997
