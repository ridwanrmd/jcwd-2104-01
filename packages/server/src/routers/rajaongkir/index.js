const express = require('express');
const router = express.Router();

const getRajaongkir = require('./get.rajaongkir');

router.use(getRajaongkir);

module.exports = router;
