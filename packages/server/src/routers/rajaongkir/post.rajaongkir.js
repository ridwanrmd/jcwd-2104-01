const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/ongkos/:asal/:tujuan/:berat/:kurir', (req, res) => {
  const param = req.params;
  axios
    .post('/cost', {
      origin: param.asal,
      destination: param.tujuan,
      weight: param.berat,
      courier: param.kurir,
    })
    .then((response) => res.json(response.data))
    .catch((err) => res.send(err));
});

module.exports = router;
