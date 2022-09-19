const express = require('express');
const router = express.Router();

const getRajaongkir = require('./get.rajaongkir');
const postRajaongkir = require('./post.rajaongkir');

router.use(getRajaongkir);
router.use(postRajaongkir);

module.exports = router;
