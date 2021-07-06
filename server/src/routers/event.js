const express = require('express')
const Event = require('../models/event')
const router = new express.Router()

router.post('/event', (req, res) => {
  console.log(req)

})

module.exports = router;
