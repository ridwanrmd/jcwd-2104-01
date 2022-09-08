require('dotenv/config');
const express = require('express');
const app = express();


const { error } = require('console');

const PORT = process.env.PORT || 8000;
const cors = require('cors');

// Routers
const userRouter = require('./routers/user');

// Config

app.use(cors());
app.use('/public', express.static('public'));
app.use(express.json());

// router
app.use('/user', UserRouter);

app.get('/api', (req, res) => {
  res.send(`Hello, this is my API`);
});


//error handler
app.use((error, req, res, next) => {
  console.log({ error });
  const errorObj = { status: 'ERROR', message: error.message, detail: error };
  const httpCode = typeof error.code == 'number' ? error.code : 500;
  res.status(httpCode).send(errorObj);
});



app.listen(PORT, (error) => {
  if (error) {
    console.log(`ERROR: ${error.message}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
