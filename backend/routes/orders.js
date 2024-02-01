const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET orders endpoint!');
})

module.exports = router;
