const express = require('express');
const router = express.Router();

const postReportRouter = require('./post.report');
const getReportRouter = require('./get.report');

router.use(postReportRouter);
router.use(getReportRouter);

module.exports = router;
