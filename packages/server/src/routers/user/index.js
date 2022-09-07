
const express = require("express")
const router =express.Router()

const getUserRouter = require("./get.user")
const PostloginRouter = require("./post.user")
const changePassRouter = require("./patch.user")

router.use(getUserRouter)
router.use(PostloginRouter)
router.use(changePassRouter)
module.exports = router