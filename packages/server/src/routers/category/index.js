const express = require('express');
const router = express.Router();

const getCategoryRouter = require('./get.category');
const postCategoryRouter = require('./post.category');
const patchCategoryRouter = require('./patch.category');
const deleteCategoryRouter = require('./delete.category');

router.use(getCategoryRouter);
router.use(postCategoryRouter);
router.use(patchCategoryRouter);
router.use(deleteCategoryRouter);

module.exports = router;
