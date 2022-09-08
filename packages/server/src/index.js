require('dotenv/config');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

// Routers
const userRouter = require('./routers/user');

// Config
app.use(cors());
app.use('/public', express.static('public'));
app.use(express.json());

app.get('/api', (req, res) => {
  res.send(`Hello, this is my API`);
});

app.use('/users', userRouter);

app.use((error, req, res, next) => {
  const errorObj = {
    status: 'Error',
    message: error.message,
    detail: error,
  };

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
