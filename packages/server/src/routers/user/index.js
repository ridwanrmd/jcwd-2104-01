<<<<<<< HEAD

const express = require("express")
const router =express.Router()

const getUserRouter = require("./get.user")
const PostloginRouter = require("./post.user")
const changePassRouter = require("./patch.user")

router.use(getUserRouter)
router.use(PostloginRouter)
router.use(changePassRouter)
module.exports = router
=======
const express = require('express');
const router = express.Router();

const patchUserRouter = require('./patch.user');

router.use(patchUserRouter);

module.exports = router;
>>>>>>> e29119b79b2a80b08b1dce981098ed03ef273349
