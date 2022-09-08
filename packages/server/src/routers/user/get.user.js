
const express = require("express")


const router = express.Router()
const {user} = require("../../../models")
const {auth} = require("../../helpers/auth")
const {verifyToken} = require("../../lib/token")

const getUser = async (req,res,next) => {
    try {
        const {userId} = req.params
        const resGetUser = await user.findOne({
            where : {userId}
        })
        const {dataValues} = resGetUser
        res.send({data : dataValues})
    } catch (error) {
        next(error)
        console.log(error);
    }
}

const getUserWithToken = async (req,res,next) => {
    try {
        const token = req.params
        const verifiedToken = verifyToken(token)
        
        const {userId} = verifiedToken.user
        const resGotUser= await user.findOne({where: {userId}})
        console.log(resGotUser);
        res.send({ 
            status: "Success",
            message: "Get user with token",
            user: resGotUser,
        })
    } catch (error) {
        next(error)
        console.log(error);
    }
}

router.get("/userToken", getUserWithToken)
router.get("/:userId",getUser)
module.exports = router