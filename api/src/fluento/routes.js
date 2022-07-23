const express = require('express');
var router = express.Router();

const contact = require('./controller/http/contact.js');

router.post('/contact', (req, res) => {
  contact.execute(req, function(err){
    if(err){
      return res.status(500).send(err.message);
    }

    return res.sendStatus(200);
  });
})

module.exports = router;
