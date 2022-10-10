const express = require('express');
const router = express.Router();

const postReportRouter = require('./post.report');
router.use(postReportRouter);

module.exports = router;
