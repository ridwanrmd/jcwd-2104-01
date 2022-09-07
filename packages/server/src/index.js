require('dotenv/config');
const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user');
const { join } = require('path');

const PORT = process.env.PORT || 8000;
const app = express();

const UserRouter = require("./routers/user");

const { error } = require('console');
app.use(cors());
app.use('/api/public', express.static('public'));
app.use(express.json());

// router
app.use("/user", UserRouter)

app.get('/api', (req, res) => {
  res.send(`Hello, this is my API`);
});

<<<<<<< HEAD
//error handler
app.use((error ,req, res, next) => {
  console.log({error});
  const errorObj = { status : "ERROR", message: error.message, detail:error}
  const httpCode = typeof error.code == "number" ? error.code : 500;
  res.status(httpCode).send(errorObj);

})
=======
app.use('/api/users', userRouter);
>>>>>>> e29119b79b2a80b08b1dce981098ed03ef273349

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
