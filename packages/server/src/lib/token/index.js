const jwt = require("jsonwebtoken")
const secret_jwt= "FINPRO"

//bikin token
const createToken = (payload) => jwt.sign(payload, secret_jwt)
// checking token dari mana
const verifyToken =(token) => jwt.verify(token,secret_jwt)

module.exports = {createToken,verifyToken}