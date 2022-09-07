const jsonToken = require('jsonwebtoken');
const secretWord = 'ehe_ehe';

const createToken = (payload) => jsonToken.sign(payload, secretWord);
const verifyToken = (token) => jsonToken.verify(token, secretWord);

module.exports = { createToken, verifyToken };
