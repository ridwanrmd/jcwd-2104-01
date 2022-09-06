const express = require('express');
const router = express.Router();

const patchUserRouter = require('./patch.user');

router.use(patchUserRouter);

module.exports = router;
