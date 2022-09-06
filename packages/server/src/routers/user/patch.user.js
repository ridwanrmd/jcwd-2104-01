const express = require('express');
const router = express.Router();

router.patch('/', async (req, res) => {
  res.send('lohe');
});

module.exports = router;
