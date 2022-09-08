const express = require('express');
const router = express.Router();

const getRouter = require('./get.user');
const postRouter = require('./post.user');
const patchRouter = require('./patch.user');

router.use(getRouter);
router.use(postRouter);
router.use(patchRouter);
module.exports = router;
