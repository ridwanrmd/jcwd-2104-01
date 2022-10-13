const express = require('express');
const router = express.Router();

const getLogHistoriesRouter = require('./get.logHistory');

router.use(getLogHistoriesRouter);

module.exports = router;
