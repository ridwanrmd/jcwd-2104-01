const express = require('express');
const router = express.Router();

const { user } = require('../../../models');
const { createToken } = require('../../lib/token');
const { compare } = require('../../lib/bycrypt');

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const resGetLoginUser = await user.findOne({
      where: { email: email },
    });

    if (!resGetLoginUser) {
      throw {
        code: 400,
        message: 'email yang anda masukan salah',
      };
    }
    const userPass = resGetLoginUser.dataValues;
    // console.log(userPass);

    //sementara
    // if (password !== userPass.password) {
    //   throw {
    //     code: 400,
    //     message: 'password yang anda masukan salah',
    //   };
    // }

    //kalau udh pake hashing
    const isPasswordMatch = compare(password, userPass.password);
    if (!isPasswordMatch) {
      throw {
        code: 400,
        message: `Password yang anda masukan salah`,
      };
    }

    const token = createToken({
      userId: userPass.userId,
      first_name: userPass.first_name,
    });

    res.send({
      status: 'Succsess',
      message: 'Login Succsess',
      data: {
        result: {
          userId: userPass.userId,
          first_name: userPass.first_name,
          accessToken: token,
        },
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

router.post('/login', loginUserController);
module.exports = router;
