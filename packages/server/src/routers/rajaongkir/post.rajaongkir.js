const express = require('express');
const router = express.Router();
const axios = require('axios');

//config axios to rajaongkir
axios.defaults.baseURL = 'https://api.rajaongkir.com/starter';
axios.defaults.headers.common['key'] = '205258f7c4c0e26bd2a06dbbcabd2ca5';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

// get ongkir endpoint
router.post('/ongkos', (req, res) => {
  const body = req.body;
  axios
    .post('/cost', body)
    .then((response) => res.json(response.data))
    .catch((err) => res.send(err));
});

module.exports = router;
