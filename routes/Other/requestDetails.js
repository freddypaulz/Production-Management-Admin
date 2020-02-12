const express = require('express');

const router = express.Router();

const RequestDetails = require('../../models/Other/RequestDetails');

router.get('/request-details', (req, res, next) => {
   RequestDetails.find({}).then(RequestDetails => {
      res.send({ RequestDetails });
   });
});

module.exports = router;
