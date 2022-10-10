const express = require('express');
const router = express.Router();

const postPrescriptionRouter = require('./post.prescription');
const getPrescriptionRouter = require('./get.prescription');

router.use(postPrescriptionRouter);
router.use(getPrescriptionRouter);

module.exports = router;
